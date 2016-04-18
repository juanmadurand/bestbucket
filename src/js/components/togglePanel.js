'use strict';

class TogglePanel {
  setEnabled(enabled = true) {
    this.enabled = enabled;
  }

  init() {
    if (!$('.source').length) {
      setTimeout(() => this.init(), 1000);
      return;
    }
    $('#compare').addClass('togglePanelWrapper');
    $('.diff-container .heading .primary').click(function() {
      $(this).parents('.bb-udiff').toggleClass('collapsed');
    });
  }

  getButton() {
    const toggleAllPanels = this.toggleAllPanels;
    if (!this.enabled) {
      return '';
    } else {
      const btn = $('<button id="togglePanels" class="bb_menu_item aui-button" />')
        .text('Panels')
        .prepend('<span class="aui-icon aui-icon-small aui-iconfont-expanded" />')
        .click(toggleAllPanels);
      return btn;
    }
  }

  toggleAllPanels() {
    const toggleIcon = $(this).find('.aui-icon');
    const collapse = toggleIcon.hasClass('aui-iconfont-expanded');
    if (collapse) {
      $('.bb-udiff').addClass('collapsed');
    } else {
      $('.bb-udiff').removeClass('collapsed');
    }
    toggleIcon.toggleClass('aui-iconfont-collapsed aui-iconfont-expanded');
  }
}

export default new TogglePanel();
