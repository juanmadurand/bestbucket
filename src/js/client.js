 'use strict';

class ExtensionClient {
  constructor() {
    this.renderMenu = this.renderMenu.bind(this);
    this.toggleInvisibleCharacters = this.toggleInvisibleCharacters.bind(this);
    this.findMixedSpacesTabs = this.findMixedSpacesTabs.bind(this);
    this.renderMenu();
    this.findMixedSpacesTabs();
    this.initTogglePanel();
  }

  renderMenu() {
    const toggleInvisibleCharacters = this.toggleInvisibleCharacters;
    const toggleAllPanels = this.toggleAllPanels;
    const menu = $('<div class="bb_menu" />')
    .append(
      $('<button id="toggleWhitespace" class="bb_menu_item aui-button" />')
        .text('whitespaces and tabs')
        .prepend('<span class="aui-icon aui-icon-small aui-iconfont-unwatch" />')
        .click(toggleInvisibleCharacters)
    )
    .append(
      $('<button id="togglePanels" class="bb_menu_item aui-button" />')
        .text('Panels')
        .prepend('<span class="aui-icon aui-icon-small aui-iconfont-expanded" />')
        .click(toggleAllPanels)
    );

    const bbContainer = $('<section class="bb_container main" />')
      .append('<h1>BestBucket Extension</h1>')
      .append(menu);

    $('#general-comments').before(bbContainer);
  }

  createInvisibleWhitespaces() {
    if ($('.bb_source:visible').length) {
      return;
    }
    $('#toggleWhitespace').addClass('active');
    $(".source").each(function (elem) {
      const text = $(this).html();
      const regex = /([\+|\-])?(\s*)(.+)/g;
      const match = regex.exec(text);

      if(match) {
        let matchedLine, diffSign = null, matchedWhitespaces, matchedCode;
        if (match.length === 4) {
          [matchedLine, diffSign, matchedWhitespaces, matchedCode] = match;
        } else {
          [matchedLine, matchedWhitespaces, matchedCode] = match;
        }
        var newElem = $('<div class="source bb_source"/>');
        var whitespaces = matchedWhitespaces.replace(/\ /g,
          '<span class="leading-whitespace invisible-character">·</span>');
        var whitespaces = whitespaces.replace(/\t/g,
          '<span class="leading-whitespace hard-tab invisible-character">» </span>');
        var code = $('<pre>').append(matchedCode);
        newElem.append(whitespaces).append(code);
        if (diffSign) {
          newElem.prepend(diffSign);
        }
        $(this).before(newElem);
        $(this).addClass('old-one').hide();
      }
    });
  }

  toggleInvisibleCharacters() {
    if (!$('.bb_source').length) {
      return this.createInvisibleWhitespaces();
    }
    const showWhitespace = !$('.bb_source:visible').length;
    $('.old-one').toggle(!showWhitespace);
    $('.bb_source').toggle(showWhitespace);
    if (showWhitespace) {
      $('#toggleWhitespace').addClass('active');
    } else {
      $('#toggleWhitespace').removeClass('active');
    }
  }

  findMixedSpacesTabs() {
    if (!$('.source').length) {
      setTimeout(() => this.findMixedSpacesTabs(), 1000);
      return;
    }
    $('.source').each(function (elem) {
      const text = $(this).text();
      const regex = /\ \t|\t\ /g;
      const match = regex.exec(text);

      if (match) {
        const parent = $(this).parents('.udiff-line');
        const warning = $('<div />')
        .addClass('bb_warning')
        .append('<i class="aui-icon aui-icon-small aui-iconfont-warning" />')
        .attr('title', 'This line has mixed spaces and tabs');

        parent.append(warning);
        parent.find('.gutter').addClass('warning');
      }
    });
  }

  initTogglePanel() {
    chrome.storage.sync.get({
      onClickDisplay: true
    }, function(options) {
      if (options.onClickDisplay) {
      $('.diff-container .heading .primary').click(function() {
        $(this).parents('.bb-udiff').toggleClass('collapsed');
      });
      } else {
        $('.diff-container .heading .primary').unbind('click');
      }
    });
  }

  toggleAllPanels() {
    // TODO: Review the correct behavior of the toggle button, now the first defines.
    const collapse = !$('.bb-udiff:first').hasClass('collapsed');
    if (collapse) {
      $('.bb-udiff').addClass('collapsed');
    } else {
      $('.bb-udiff').removeClass('collapsed');
    }
    $(this).find('.aui-icon').toggleClass('aui-iconfont-collapsed aui-iconfont-expanded');
  }
}


new ExtensionClient();
