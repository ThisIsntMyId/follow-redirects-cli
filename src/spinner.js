const ora = require('ora');

const spinnerObj = {
    "interval": 80,
    "frames": [
        "⠋",
        "⠙",
        "⠹",
        "⠸",
        "⠼",
        "⠴",
        "⠦",
        "⠧",
        "⠇",
        "⠏"
    ]
};

// const throbber = ora({
//     spinner: spinnerObj,
//     text: 'Rounding up all the alligators'
// }).start();

// Simulating some asynchronous work for 10 seconds...
// setTimeout(() => {
//     throbber.stopAndPersist({
//         text: 'Loading Finished'
//     });
// }, 1000 * 2);

const spinnerWithText = text => {
    return ora({
        spinner: spinnerObj,
        text: text
    })
}

module.exports = { spinnerWithText }