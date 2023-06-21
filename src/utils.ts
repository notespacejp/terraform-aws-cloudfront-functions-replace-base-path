export const isMatchPath = (path: string, pathList: RegExp[]): boolean => {
    return pathList.some((it) => it.test(path))
}
