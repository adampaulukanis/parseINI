/* jshint strict: global, esversion: 6, node: true, mocha: true */
'use strict';

import { strict as assert } from 'assert';
import { parseINI } from '../index.js';

const testString = `
fullname=Adam Paulukanis
dob=1985

; comment
; one section deals with one thing
[Poland]
official=Republic of Poland
capital=Warsaw
language=Polish
url=https://en.wikipedia.org/wiki/Poland

[Czech]
official=Czech Republic
capital=Prague
language=Czech
url=https://en.wikipedia.org/wiki/Czech_Republic
`;

const returnedArray = parseINI(testString);

describe('Integration test for parseINI()', function () {
  it('The first section should have null name and have 2 fields', function () {
    assert.deepEqual(returnedArray[0], {
      name: null,
      fields: [
        {
          name: 'fullname',
          value: 'Adam Paulukanis',
        },
        {
          name: 'dob',
          value: '1985',
        },
      ],
    });
  });

  it('The second section should have name Poland and have 4 fields', function () {
    assert.deepEqual(returnedArray[1], {
      name: 'Poland',
      fields: [
        {
          name: 'official',
          value: 'Republic of Poland',
        },
        {
          name: 'capital',
          value: 'Warsaw',
        },
        {
          name: 'language',
          value: 'Polish',
        },
        {
          name: 'url',
          value: 'https://en.wikipedia.org/wiki/Poland',
        },
      ],
    });
  });

  it('The last section should have name Czech and have 4 fields', function () {
    assert.deepEqual(returnedArray[2], {
      name: 'Czech',
      fields: [
        {
          name: 'official',
          value: 'Czech Republic',
        },
        {
          name: 'capital',
          value: 'Prague',
        },
        {
          name: 'language',
          value: 'Czech',
        },
        {
          name: 'url',
          value: 'https://en.wikipedia.org/wiki/Czech_Republic',
        },
      ],
    });
  });

  it('Throws when there is an error', function () {
    assert.throws(
      () => {
        parseINI('=url== http://www.google.com/search?q=$1');
      },
      {
        name: /Error/,
        message: /^Line (.*) is wrong\.$/,
      }
    );
  });
});
