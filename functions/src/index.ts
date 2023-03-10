import {isIncludeIgnorePath} from "./util";

function handler(event: AWSCloudFrontFunction.Event): AWSCloudFrontFunction.Request | AWSCloudFrontFunction.Response {
    const {request} = event
    const {headers} = request

    const ignoreList = [
        '/favicon.ico',
        '/static/favicon.ico',
        '/.well-known/hello',
    ]

    if (isIncludeIgnorePath(request.uri, ignoreList))
        return request

    // basic authorization
    const authString = 'Basic ${authString}'
    if (headers.authorization && headers.authorization.value === authString )
        return request


    return {
        statusCode: 401,
        statusDescription: "Unauthorized",
        headers: {
            "www-authenticate": { value: "Basic" },
            'x-base-url': {value: `request.uri: ${request.uri}`}
        }
    }
}