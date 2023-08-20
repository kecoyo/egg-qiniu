'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/egg-qiniu.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-qiniu-test',
      plugin: 'egg-qiniu',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should test hi', () => {
    assert(app.qiniu.hi() === 'hi');
  });
});
