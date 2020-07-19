/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    let result = tweet.split(' ')
        .filter((element) => element.startsWith('#'))
        .map((element) => element.substr(1));
    return result;
};
