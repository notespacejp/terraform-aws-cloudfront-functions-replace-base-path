export function isIncludeIgnorePath(path: string, ignoreList: string[]): boolean {
    return ignoreList.some((it) => path.startsWith(it))
}
