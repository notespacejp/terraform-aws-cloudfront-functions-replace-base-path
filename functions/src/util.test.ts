import { describe, expect, test } from 'vitest'
import { isIncludeIgnorePath } from './util'

describe('isIncludeIgnorePath', () => {
    const ignoreList = ['/favicon.ico', '/static/favicon.ico', '/.well-known/hello']
    test.each([
        ['/favicon.ico', true],
        ['/static/favicon.ico', true],
        ['/.well-known/hello', true],
        ['/.well-known/hello2', true],
        ['/.well-known/hello/3', true],
        ['/poe', false],
        ['/poe/2', false],
    ])('exact %s result: %o', (path, result) => {
        expect(isIncludeIgnorePath(path, ignoreList)).toBe(result)
    })
})
