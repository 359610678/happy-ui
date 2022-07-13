import { createTest, destroyVM } from '../util';
import DialogWrapper from 'packages/dialog-wrapper';

describe('DialogWrapper', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(DialogWrapper, true);
    expect(vm.$el).to.exist;
  });
});

