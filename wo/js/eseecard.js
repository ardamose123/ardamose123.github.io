// -----------------------------------------------------------------------------
// Local storage of information
// -----------------------------------------------------------------------------

function storeObject(key, value)
{
  localStorage.setItem(key, JSON.stringify(value));
}

function retrieveObject(key, def)
{
  var value  = localStorage.getItem(key);
  var parsed = value && JSON.parse(value);

  return (parsed === undefined || parsed === null) ? def : parsed;
}



// -----------------------------------------------------------------------------
// "My Cards" feature
// -----------------------------------------------------------------------------

var myCardsKey = 'MyCards';

function listMyCards()
{
  return retrieveObject(myCardsKey, {});
}



/* -----------------------------------------------------------------------------
   "My Contacts" feature

   Individual contacts are supposed to have the following structure:
   {
     name       ::  String
     location   ::  String
     job        ::  String
     company    ::  String
     phone      ::  String
     email      ::  String
     categories :: [String]
     hashtags   :: [String]
   }
   -------------------------------------------------------------------------- */

var contactsKey = 'Contacts';

function listContacts()
{
  return retrieveObject(contactsKey, {});
}

function storeContacts(categories)
{
  return storeObject(contactsKey, categories);
}

function modifyContacts(f)
{
  storeContacts(f.call(this, listContacts()));
}

function addContact(contact)
{
  modifyContacts(function(contacts) {
    contact.id = contact.name;
    contacts[contact.id] = contact;
    return contacts;
  });
}

function updateContact(contact)
{
  modifyContacts(function(contacts) {
    contacts[contact.id] = contact;
    return contacts;
  });
}

function deleteContact(theId)
{
  modifyContacts(function(contacts) {
    delete contacts[theId];
    return contacts;
  });
}

function renderContactList(contactList)
{
  return Object.keys(contactList).map(function(contactKey)
    {
      var contact = contactList[contactKey];

      return (
        '<div class="ui clearing segment" onclick="window.location = \'contact.html?type=contact&key=' + contactKey + '\';">' +
          '<div class="right floated">' +
            '<i class="red trash icon" data-id="' + contactKey + '"></i>' +
          '</div>' +
          contact.name +
        '</div>');
    }).join('');
}

function renderCategoryFilterList()
{

}






var categoriesKey = "Categories";

function listCategories()
{
  return retrieveObject(categoriesKey, {});
}

function storeCategories(categories)
{
  delete categories[''];
  return storeObject(categoriesKey, categories);
}

function modifyCategories(f)
{
  var asd = f(listCategories());
  storeCategories(asd);
}

function renderCategoryDropdown(id, name)
{
  var categories = Object.keys(listCategories()).map(function(category, index) {
    return '<div class="item" data-value="' + category + '">' + category + '</div>';
  }).join('');

  return (
    '<div id="' + id + '" class="ui fluid multiple selection search dropdown">' +
      '<input type="hidden">' +
      '<i class="dropdown icon"></i>' +
      '<div class="default text">Categorías&hellip;</div>' +
      '<div class="menu">' +
        categories +
      '</div>' +
    '</div>');
}




var hashtagsKey = "Hashtags";

function listHashtags()
{
  return retrieveObject(hashtagsKey, {});
}

function storeHashtags(hashtags)
{
  delete hashtags[''];
  return storeObject(hashtagsKey, hashtags);
}

function modifyHashtags(f)
{
  var asd = f(listHashtags());
  storeHashtags(asd);
}

function renderHashtagsDropdown(id, name)
{
  var hashtags = Object.keys(listHashtags()).map(function(hashtag, index) {
    return '<div class="item" data-value="' + hashtag + '">' + hashtag + '</div>';
  }).join('');

  return (
    '<div id="' + id + '" class="ui fluid multiple selection search dropdown">' +
      '<input type="hidden">' +
      '<i class="dropdown icon"></i>' +
      '<div class="default text">Hashtags&hellip;</div>' +
      '<div class="menu">' +
        hashtags +
      '</div>' +
    '</div>');
}



function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}




function searchArray(source)
{
  return retrieveObject(source, []);
}

function addSearchTarget(source, target)
{
  var s = searchArray(source);
  var i = s.findIndex(function(e) { e.title === target });

  if (i === -1)
    s.push({ title: target, count: 1 });
  else
    s[i].count++;

  return storeObject(source, s);
}

var companiesKey = 'Companies';
var positionsKey = 'Jobs';
var locationsKey = 'Locations';

function cleanLocalStorage()
{
  Object.keys(localStorage).forEach(function(key) { localStorage.removeItem(key); });
}
