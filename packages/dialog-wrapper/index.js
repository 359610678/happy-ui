import DialogWrapper from './src/main';

/* istanbul ignore next */
DialogWrapper.install = function(Vue) {
  Vue.component(DialogWrapper.name, DialogWrapper);
};

export default DialogWrapper;
