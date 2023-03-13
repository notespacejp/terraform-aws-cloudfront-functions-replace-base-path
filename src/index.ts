import { isIncludeIgnorePath } from './util'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event: AWSCloudFrontFunction.Event): AWSCloudFrontFunction.Request | AWSCloudFrontFunction.Response {
    const { request } = event
    const { headers } = request

    const ignoreList = JSON.parse('${ignore_list}')

    if (isIncludeIgnorePath(request.uri, ignoreList)) return request

    // basic authorization
    const authString = 'Basic ${authString}'
    if (headers.authorization && headers.authorization.value === authString) return request

    return {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        headers: {
            'www-authenticate': { value: 'Basic' },
        },
    }
}
