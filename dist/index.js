'use strict';

var isMatchPath = function(path, pathList) {
    return pathList.some(function(it) {
        return it.test(path);
    });
};

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var table = [
    {
        host: "base-client-cdk-dev-pv-assets.s3.ap-northeast-1.amazonaws.com",
        pathList: [
            "/assets/(.*)",
            "/static/(.*)"
        ],
        basePath: "/__id__",
        pathReplaceKey: "__id__"
    },
    {
        host: "__id__.lambda-url.ap-northeast-1.on.aws",
        hostReplaceKey: "__id__",
        pathList: [
            "/(.*)"
        ],
        basePath: ""
    }
].map(function(it) {
    return _objectSpreadProps(_objectSpread({}, it), {
        pathList: it.pathList.map(function(path) {
            return new RegExp(path);
        })
    });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
    var request = event.request;
    // const a = {
    //     method: 'GET',
    //     uri: '/favicon.ico',
    //     querystring: {},
    //     headers: {
    //         'user-agent': { value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' },
    //         'sec-ch-ua-mobile': { value: '?0' },
    //         referer: { value: 'https://aba.pv.base-client.notespace.dev/assets/chunks/chunk-771fc9b6.js' },
    //         accept: { value: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8' },
    //         host: { value: 'aba.pv.base-client.notespace.dev' },
    //         'sec-fetch-site': { value: 'same-origin' },
    //         'sec-fetch-dest': { value: 'image' },
    //         'accept-language': { value: 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4' },
    //         'accept-encoding': { value: 'gzip, deflate, br' },
    //         'sec-ch-ua-platform': { value: '"macOS"' },
    //         'sec-ch-ua': { value: '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' },
    //         'sec-fetch-mode': { value: 'no-cors' },
    //     },
    //     cookies: {},
    // };
    console.log(request);
    var functionId = request.headers.host.value.split(".")[0];
    var pathTable = table.find(function(param) {
        var pathList = param.pathList;
        return isMatchPath(request.uri, pathList);
    });
    if (!pathTable) {
        return request;
    }
    var host = pathTable.hostReplaceKey ? pathTable.host.replace(pathTable.hostReplaceKey, functionId) : pathTable.host;
    var uri = pathTable.pathReplaceKey ? "".concat(pathTable.basePath.replace(pathTable.pathReplaceKey, functionId)).concat(request.uri) : "".concat(pathTable.basePath).concat(request.uri);
    console.log("functionId: ".concat(functionId));
    console.log("host: ".concat(host));
    console.log("uri: ".concat(uri));
    request.uri = uri;
    return request;
// return {
//     ...request,
//     uri,
//     // headers: {
//     //     ...request.headers,
//     //     host: {
//     //         value: host,
//     //     },
//     // },
// }
}
