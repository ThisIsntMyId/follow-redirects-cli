// Native Https
const https = require('https')
const http = require('http')
const url = require('url')
const chalk = require('chalk')
const { spinnerWithText } = require('./spinner')

const visitUrl = (urlString, options = {}) => {
    const urlOptions = Object.assign({}, url.parse(urlString), options)
    const library = urlOptions.protocol === 'https:' ? https : http
    // console.log("visitUrl -> urlOptions", urlOptions)
    return new Promise((resolve, reject) => {
        library.get(urlOptions, (res) => {
            const { statusCode, headers, rawHeaders } = res

            const data = [];
            res.on('data', chunk => data.push(chunk))
            res.on('end', () => {
                // resolve({ statusCode, headers, rawHeaders, data: Buffer.concat(data).toString() });
                resolve({ statusCode, headers, rawHeaders });
            })

        }).on('error', (e) => {
            reject(e);
        });
    })
}

const followUrl = async (urlString, options = {}, prompts = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const REDIRECTED_STATUSES = [300, 301, 302, 303, 304, 307, 308]
            let finalResponse = [];
            let nextUrlToVisit = urlString;
            do {

                let spinner
                if (prompts) {
                    spinner = spinnerWithText(chalk.cyan('visiting ') + nextUrlToVisit)
                    spinner.start()
                }
                const res = await visitUrl(nextUrlToVisit, options)
                if (prompts) spinner.stopAndPersist({ text: chalk.green.bold('visited ') + nextUrlToVisit })
                nextUrlToVisit = res.headers.location
                finalResponse.push(res)
                if (!REDIRECTED_STATUSES.includes(res.statusCode)) break;
            } while (true)

            resolve(finalResponse);
        } catch (err) {
            reject(err)
        }
    })
}

// (async () => {
//     let sss = await followUrl('https://links.desidime.com/?ref=get_deals&url=https://www.walmart.com', { timeout: 300000 }, true)
//     // console.log(sss)
// })();

// module.exports = {
//     visitUrl,
//     followUrl
// }
module.exports = followUrl
