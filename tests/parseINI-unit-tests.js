/* jshint strict: global, mocha: true, esversion: 6, node: true */

'use strict';

import { parseINI } from '../index.js';
import { strict as assert } from 'assert';

let testString;
let parsedINI;

describe('parseINI unit tests', function () {
  it('should have the very first category { name: null, fields: [] }', function () {
    assert(parseINI().length === 1);
    assert.deepEqual(parseINI()[0], {
      name: null,
      fields: [],
    });
  });

  it('should ignore empty lines', function () {
    testString = '\n\n\n';
    assert(parseINI(testString).length === 1);

    testString = `




    `;
    assert(parseINI(testString).length === 1);
  });

  it('should ignore lines starting with ; (comment)', function () {
    testString = `; this is a comment
    ;another one
    ; guess what? comment 😀`;
    parsedINI = parseINI(testString);
    assert(parsedINI.length === 1);

    testString = `

    ; comment


    ; another comment

    `;
    parsedINI = parseINI(testString);
    assert(parsedINI.length === 1);
  });

  it('should start a new section when finds something between [ and ]', function () {
    testString = `[gargamel]`;
    parsedINI = parseINI(testString);
    assert(parsedINI.length === 2);
    assert(parsedINI[1].name === 'gargamel');

    testString = `[first section]
    ;
    ;;
    ;;;

[second section]
    ;;;
    ;;
    ;`;
    parsedINI = parseINI(testString);
    assert(parsedINI[1].name === 'first section');
    assert.deepEqual(parsedINI[1].fields, []);
    assert(parsedINI[2].name === 'second section');
    assert.deepEqual(parsedINI[2].fields, []);
  });

  it('should add values to a section when finds something = something', function () {
    testString = `[http codes]
1xx=informational response
2xx=successful
3xx=redirection
4xx=client error
5xx=server error`;
    parsedINI = parseINI(testString);
    assert(parsedINI.length === 2);
    assert(parsedINI[1].fields[0].name === '1xx');
    assert(parsedINI[1].fields[0].value === 'informational response');
    assert(parsedINI[1].fields.length === 5);
  });

  it('should throw when the input is ill-formed', function () {
    testString = `[wrong]
    name = hello world!
    `;
    assert.throws(
      () => {
        parseINI(testString);
      },
      {
        name: /Error/,
        message: /^Line (.*) wrong\.$/,
      }
    );
  });
});
