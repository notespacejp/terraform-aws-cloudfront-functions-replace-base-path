const { ESLint } = require('eslint')

const cli = new ESLint({})

const filterAsync = async (array, callback) => {
    const results = await Promise.all(array.map((value, index) => callback(value, index)))
    return array.filter((_, i) => results[i])
}

const removeIgnoredFiles = async (files) => {
    const filteredFiles = await filterAsync(files, async (file) => {
        const isIgnored = await cli.isPathIgnored(file)
        return !isIgnored
    })
    return filteredFiles.join(' ')
}

module.exports = {
    '*.{js,json,vue,ts,jsx,tsx}': async (files) => [
        'eslint --max-warnings 0 --fix ' + (await removeIgnoredFiles(files)),
        'prettier --write ' + files.join(' '),
    ],
}
