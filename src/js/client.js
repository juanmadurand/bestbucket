 'use strict';

const components = {
  collapsePanels: require('./components/togglePanel'),
  mixedTabSpaces: require('./components/mixedTabSpaces'),
  showHiddenChars: require('./components/invisibleWhitespaces'),
};

class ExtensionClient {
  constructor() {
    const renderMenu = this.renderMenu.bind(this);

    chrome.storage.sync.get({
      collapsePanels: true,
      mixedTabSpaces: true,
      showHiddenChars: true,
    }, function(options) {
      const menuButtons = [];
      for (var key in options) {
        const component = components[key];
        component.setEnabled(options[key]);
        if (options[key]) {
          component.init();
          const btn = component.getButton();
          if (btn) {
              menuButtons.push(btn);
          }
        }
      }
      if (menuButtons.length) {
        renderMenu(menuButtons);
      }
    });
  }

  renderMenu(menuButtons) {
    const toggleAllPanels = this.toggleAllPanels;
    const menu = $('<div class="bb_menu" />')
    .append(
      menuButtons
    );

    const bbContainer = $('<section class="bb_container main" />')
      .append('<h1>BestBucket Extension</h1>')
      .append(menu);

    $('#general-comments').before(bbContainer);
  }
}

new ExtensionClient();
