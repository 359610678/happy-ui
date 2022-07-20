import DrawerWrapper from './src/main';

/* istanbul ignore next */
DrawerWrapper.install = function(Vue) {
  Vue.component(DrawerWrapper.name, DrawerWrapper);
};

export default DrawerWrapper;
