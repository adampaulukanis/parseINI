/* jshint strict: global, esversion: 6, mocha: true */
'use strict';

import assert from 'assert';
import { parseINI } from '../index.js';

describe('Test my parseINI', function (){
  it('Does something', function (){
    assert(parseINI('testing'));
  });
});
