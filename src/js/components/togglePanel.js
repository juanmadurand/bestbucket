'use strict';

class TogglePanel {
  setEnabled(enabled = true) {
    this.enabled = enabled;
  }

  init() {
    if (this.enabled) {
      $('#compare').addClass('togglePanelWrapper');
      $('.diff-container .heading .primary').click(function() {
        $(this).parents('.bb-udiff').toggleClass('collapsed');
      });
    }
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

export default new TogglePanel();
