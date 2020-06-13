var assert = require('assert');
const fs = require('fs');
const { readFolder  } = require('../readDir');
const { readFile } = require('../readFile');
const mock = require('mock-fs');

describe('Read Folder', function () {
    describe('#readFolder()', function () {
        before(() => {
            mock({
                'path/to/fake/dir': {
                  '1': '1',
                  '2': '2',
                  '3': '3',
                  '4': '4',
                }
              });
            });

        it('should read from folder', async function () {
                const items = await readFolder(fs, 'path/to/fake/dir');
                assert.equal(items.length, 4);
        });

        it('should read from folder with error', async function () {
            try {
                const items = await readFolder(fs, 'path/to/fake/dirx');
            } catch (error) {
                assert.equal(error, "no such file or directory");
            }
        });

        after(() => {
            mock.restore();    
        });

  });
});

describe('Read File', function () {
    describe('#readFile()', function () {
        beforeEach(() => {
    
            mock({
                'path/to/fake/dir': {
                  '1': '1'
                },
                'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
              });
            });

        it('should read from file', async function () {
            try {
                const item = await readFile(fs, 'path/to/', 'some.png');
            } catch (error) {
                assert.notEqual(error, "no such file or directory");
            }
        });

        it('should read from file with error', async function () {
            try {
                const items = await readFile(fs, 'path/to/fake/dirxx');
                assert.equal(items.length, 4);
            } catch (error) {
                assert.equal(error, "no such file or directory");
            }
        });

        afterEach(() => {
            mock.restore();    
        });

  });
});