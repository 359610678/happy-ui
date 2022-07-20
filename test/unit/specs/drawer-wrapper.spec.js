import { createTest, destroyVM } from '../util';
import DrawerWrapper from 'packages/drawer-wrapper';

describe('DrawerWrapper', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(DrawerWrapper, true);
    expect(vm.$el).to.exist;
  });
});

