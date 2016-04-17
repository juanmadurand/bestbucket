'use strict';

class MixedTabSpaces {
  setEnabled(enabled = true) {
    this.enabled = enabled;
  }

  init() {
    if (!$('.source').length) {
      setTimeout(() => this.init(), 1000);
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

  getButton() {
    return '';
  }

}

export default new MixedTabSpaces();
