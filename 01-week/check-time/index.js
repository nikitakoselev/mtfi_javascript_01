/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    var hrs = Number(hours);
    var min = Number(minutes);

    if(hrs >= 0 && hrs <= 23 && min >= 0 && min <= 59){
        return true;
    } else {
        return false;
    }
};
