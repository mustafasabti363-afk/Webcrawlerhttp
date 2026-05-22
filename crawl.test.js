const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


test('normalizeURL trim trailing slash', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


test('normalizeURL capitlize the hostname', () => {
    const input = 'http://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML absolute', () => {
    const inputHTML = `
    <html>
    <body>
    <a href="http://blog.boot.dev">boot.dev BLOG</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'http://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['http://blog.boot.dev/'];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML relative', () => {
    const inputHTML = `
    <html>
    <body>
    <a href="/path/">Link</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'http://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['http://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both', () => {
    const inputHTML = `
    <html>
    <body>
    <a href="http://blog.boot.dev/path1/">boot.dev BLOG</a>
    <a href="/path2/">Link</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'http://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['http://blog.boot.dev/path1/', 'http://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid', () => {
    const inputHTML = `
    <html>
    <body>
    <a href="invalid">Invalid</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'http://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})