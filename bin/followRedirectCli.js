#! /usr/bin/env node
const figlet = require('figlet');
const followUrl = require('../src/index');
const fs = require('fs');
const path = require('path')

const welcome = () => {
    console.log(figlet.textSync('follow-redirects-cli'));
    console.log('welcome to follow redirects cli \n \n');
    console.log('the results will appear in results.json file in current working directory \n \n');
}

const fetchResults = async () => {
    const urlString = process.argv[2]
    return await followUrl(urlString, { timeout: 300000 }, true)
}

const wrtieToFile = (data) => {

}

(async () => {
    try {

        welcome();
        let results = await fetchResults();
        fs.writeFileSync(path.join(process.cwd(), 'results.json'), JSON.stringify(results))
        console.log('done')
    } catch (err) {
        console.log(err)
    }
})();