'use strict';

class InvisibleWhitespaces {
  setEnabled(enabled = true) {
    this.enabled = enabled;
  }

  init() {
    if (!$('.source').length) {
      setTimeout(() => this.init(), 1000);
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

  getButton() {
    const toggleInvisibleCharacters = this.toggleInvisibleCharacters;
    const enabled = this.enabled;
    if (!enabled) {
      return '';
    } else {
      const btn = $('<button id="toggleWhitespace" class="bb_menu_item aui-button" />')
        .text('whitespaces and tabs')
        .addClass(enabled ? 'active' : '')
        .prepend('<span class="aui-icon aui-icon-small aui-iconfont-unwatch" />')
        .click(toggleInvisibleCharacters)
      return btn;
    }
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

}

export default new InvisibleWhitespaces();
