/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    hashtags = hashtags
        .map((element) => element.toLowerCase());

    let result = hashtags
        .filter(function (item, pos) {
            return hashtags.indexOf(item) == pos;
        }).join(', ');

    return result;
};
