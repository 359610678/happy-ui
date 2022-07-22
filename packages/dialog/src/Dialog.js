import Vue from 'vue';
import DialogView from './DialogView.vue';

let instances = [];

export default class Dialog {
  constructor(view, cfg) {
    this.dialog = new (Vue.extend(DialogView))({
      store: Dialog.store,
      router: Dialog.router
    });
    Object.assign(this.dialog, cfg);
    this.dialog.currentView = {
      mixins: [view],
      data() {
        cfg = cfg || {};
        return cfg;
      }
    };
    this.dialog.$mount();

    this.dialog.$once('hide', (target) => {
      instances.splice(instances.indexOf(target), 1);
    });
    instances.push(this.dialog);
  }

  bind(cmp) {
    cmp.$on('hook:beforeDestroy', () => {
      this.hide();
    });
    return this;
  }

  show() {
    if (this.dialog.canShow()) {
      this.dialog.show();
    } else {
      this.dialog.hide();
    }
  }

  hide() {
    this.dialog.hide();
  }

  static closeAll() {
    instances.forEach(element => {
      element.$off();
      element.hide();
    });
    instances = [];
  }
}
