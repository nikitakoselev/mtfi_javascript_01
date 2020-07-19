const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    let totalMinutes = hours * 60 + minutes + interval;
    let totalHours = Math.floor(totalMinutes / 60);

    let result =
        (totalHours % HOURS_PER_DAY).toString().padStart(2, '0') +
        ':' +
        ((totalMinutes - totalHours * MINUTES_PER_HOUR) % 60).toString().padStart(2, '0');
    return result;
};
