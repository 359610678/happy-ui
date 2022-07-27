import { createTest, destroyVM } from '../util';
import ListView from 'packages/list-view';

describe('ListView', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(ListView, true);
    expect(vm.$el).to.exist;
  });
});

