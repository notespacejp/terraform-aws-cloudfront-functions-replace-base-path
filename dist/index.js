'use strict';

function isIncludeIgnorePath(path, ignoreList) {
    return !!ignoreList.find(function(it) {
        return path.startsWith(it);
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var ignoreList = JSON.parse("${ignore_list}");
    if (isIncludeIgnorePath(request.uri, ignoreList)) return request;
    // basic authorization
    var authString = "Basic ${authString}";
    if (headers.authorization && headers.authorization.value === authString) return request;
    return {
        statusCode: 401,
        statusDescription: "Unauthorized",
        headers: {
            "www-authenticate": {
                value: "Basic"
            }
        }
    };
}
