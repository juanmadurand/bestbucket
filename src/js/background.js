'use strict';

class ExtensionBackground {

  constructor() {
    this.events();
  }

  events() {
    chrome.browserAction.onClicked.addListener((tab) => {
      if (tab.url.indexOf('https://bitbucket.org/') != -1) {
        showBadge();
      }
    });
  }

  showBadge() {
    chrome.browserAction.setBadgeBackgroundColor({color:[190, 0, 0, 230]});
    chrome.browserAction.setBadgeText({text:"B"});
  }

  hideBadge() {
    chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 0]});
    chrome.browserAction.setBadgeText({text:""});
  }
}

new ExtensionBackground();
