 'use strict';

class ExtensionClient {
  constructor() {
    this.renderMenu = this.renderMenu.bind(this);
    this.toggleInvisibleCharacters = this.toggleInvisibleCharacters.bind(this);
    this.renderMenu();
  }

  findMixedSpacesTabs() {
    $('.sources').each((elem) => {
      const text = $(this).text();
      const regex = /\ \t|\t\ /g;
      const match = regex.exec(text);

      if (match) {
        const parent = $(this).parents('.udiff-line');

        const warning = $('<span />')
        .addClass('bb_warning aui-icon aui-icon-small aui-iconfont-warning')
        .attr('title', 'This line has mixed spaces and tabs');

        parent.append(warning);
      }
    });
  }

  renderMenu() {
    const toggleInvisibleCharacters = this.toggleInvisibleCharacters;
    const menu = $('<div class="bb_menu" />')
    .append(
      $('<button class="bb_menu_item aui-button" />')
        .text('Toggle invisible characters')
        .click(toggleInvisibleCharacters)
    )

    const bbContainer = $('<section class="bb_container main" />')
      .append('<h1>BestBucket Extension</h1>')
      .append(menu);

    $('#general-comments').before(bbContainer);
  }

  createInvisibleWhitespaces() {
    if ($('.bb_source:visible').length) {
      return;
    }
    $(".source").each(function (elem) {
      const text = $(this).html();
      const regex = /([\+|\-])?(\s*)(.+)/g;
      const match = regex.exec(text);

      if(match) {
        let matchedLine, diffSign = null, matchedWhitespaces, matchedCode;
        if (match.length === 4) {
          [matchedLine, diffSign, matchedWhitespaces, matchedCode] = match;
        }
        else {
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
      console.log('Creating invisible-whitespaces');
      return this.createInvisibleWhitespaces();
    }
    const showWhitespace = $('.bb_source:hidden').length;
    $('.old-one').toggle(!showWhitespace);
    $('.bb_source').toggle(showWhitespace);
  }
}

new ExtensionClient();
