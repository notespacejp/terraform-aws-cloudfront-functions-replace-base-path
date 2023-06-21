import { isMatchPath } from './utils'

type PathListTable = {
    pathList: RegExp[]
    basePath: string
    pathReplaceKey?: string
}

const table: PathListTable[] = (
    [
        {
            pathList: ['/assets/(.*)', '/static/(.*)'],
            basePath: '/__id__',
            pathReplaceKey: '__id__',
        },
    ] as (Omit<PathListTable, 'pathList'> & { pathList: string[] })[]
).map((it) => ({
    ...it,
    pathList: it.pathList.map((path) => new RegExp(path)),
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event: AWSCloudFrontFunction.Event): AWSCloudFrontFunction.Request | AWSCloudFrontFunction.Response {
    const { request } = event

    const prefix = request.headers.host.value.split('.')[0]
    const pathTable = table.find(({ pathList }) => isMatchPath(request.uri, pathList))
    if (!pathTable) {
        return request
    }

    request.uri = pathTable.pathReplaceKey
        ? `${pathTable.basePath.replace(pathTable.pathReplaceKey, prefix)}${request.uri}`
        : `${pathTable.basePath}${request.uri}`

    return request
}
