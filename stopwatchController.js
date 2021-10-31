import { model } from './stopwatchModel.js';
import { view } from './stopwatchView.js';

export const controller = {
  start() {
    document.addEventListener('click', this.onClick.bind(this));
    view.start();
  },

  onClick({ target }) {
    let action = target.dataset.action;
    let replace = target.dataset.replace;

    if (replace) {
      view.replaceBtn(replace.split('-'));
    }

    if (action) {
      model[action]();
    }
  }
};
