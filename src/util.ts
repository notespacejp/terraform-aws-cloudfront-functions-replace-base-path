export function isIncludeIgnorePath(path: string, ignoreList: string[]): boolean {
    return !!ignoreList.find((it) => path.startsWith(it))
}
