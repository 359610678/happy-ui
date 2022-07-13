import ElDialog from './src/component';
import Dialog from './src/Dialog';

/* istanbul ignore next */
ElDialog.install = function(Vue) {
  Vue.component(ElDialog.name, ElDialog);
};
ElDialog.Dialog = Dialog;
export default ElDialog;
