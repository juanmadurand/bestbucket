const extensionId = chrome.runtime.id;

chrome.storage.sync.get({
    collapsePanels: true,
    mixedTabSpaces: true,
    showHiddenChars: true,
  }, function(opt) {
    $('#toggle_collapse').find('.state').addClass(opt.collapsePanels ? 'enabled' : 'disabled');
    $('#toggle_mixedspaces').find('.state').addClass(opt.mixedTabSpaces ? 'enabled' : 'disabled');
    $('#toggle_hiddenChars').find('.state').addClass(opt.showHiddenChars ? 'enabled' : 'disabled');
});

$('#toggle_collapse').click(function(e) {
  e.preventDefault();
  const togggleBtn = $(this);
  toggleSetting('collapsePanels', function() {
    togggleBtn.find('.state').toggleClass('enabled disabled');
  });
});
$('#toggle_mixedspaces').click(function(e) {
  e.preventDefault();
  const togggleBtn = $(this);
  toggleSetting('mixedTabSpaces', function() {
    togggleBtn.find('.state').toggleClass('enabled disabled');
  });
});
$('#toggle_hiddenChars').click(function(e) {
  e.preventDefault();
  const togggleBtn = $(this);
  toggleSetting('showHiddenChars', function() {
    togggleBtn.find('.state').toggleClass('enabled disabled');
  });
});

$('#rate_this_extension').click(function(e) {
  e.preventDefault();
  window.open(`https://chrome.google.com/webstore/detail/${extensionId}`, '_blank');
});

function toggleSetting(key, cb) {
  chrome.storage.sync.get({
      [key]: true,
    }, function(opt) {
      chrome.storage.sync.set({
          [key]: !opt[key],
        }, cb);
  });
}
