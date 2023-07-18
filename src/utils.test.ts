import { describe, expect, test } from 'vitest'
import { isMatchPath } from './utils'

describe('utils', () => {
    describe('pathMatch', () => {
        describe('list', () => {
            const pathList1 = ['/assets/(.*)', '/static/(.*)', '/.well-known/(.*)']
            const pathList2 = ['/index.html', '/favicon.ico']
            const pathList3 = ['/(.*)']
            test.each([
                ['/assets/', true, pathList1],
                ['/assets/index.html', true, pathList1],
                ['/assets/a.jpg', true, pathList1],
                ['/static/a.ico', true, pathList1],
                ['/', false, pathList1],
                ['/a', false, pathList1],
                ['/a/', false, pathList1],
                ['/assets', false, pathList1],
                ['/index.html', false, pathList1],

                ['/index.html', true, pathList2],
                ['/favicon.ico', true, pathList2],
                ['/', false, pathList2],
                ['/aaa', false, pathList2],
                ['aaa', false, pathList2],
                ['', false, pathList2],
                ['', false, pathList2],

                ['/aa', true, pathList3],
                ['/', true, pathList3],
            ])('pathToRegexp %s', (path, result, pathList) => {
                expect(
                    isMatchPath(
                        path,
                        pathList.map((it) => new RegExp(it)),
                    ),
                ).toBe(result)
            })
        })

        test.each([
            ['/users/1', [/\/users\/\d+/], true],
            ['/posts/1', [/\/users\/\d+/], false],
            ['/users/1/posts/2', [/\/users\/\d+/, /\/users\/\d+\/posts\/\d+/], true],
            ['', [/\/users\/\d+/], false],
            ['/users/1', [], false],
        ])('should return %p when path is %p and pathList is %p', (path, pathList, expected) => {
            expect(isMatchPath(path, pathList)).toBe(expected)
        })
    })
})
