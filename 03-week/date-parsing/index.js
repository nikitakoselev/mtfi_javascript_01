/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (dateString) {

    const dateRegex = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/;
    const matchResults = dateString.match(dateRegex);

    const year = parseInt(matchResults[1]);
    const month = parseInt(matchResults[2]);
    const day = parseInt(matchResults[3]);
    const hour = parseInt(matchResults[4]);
    const minute = parseInt(matchResults[5]);
    const second = 0;


    function leftPad(n) {
        return n > 9 ? '' + n : '0' + n;
    }

    function formattedDate(currentDate) {
        let result = '';
        result = result + currentDate.getFullYear();
        result = result + '-' + leftPad(currentDate.getMonth() + 1);
        result = result + '-' + leftPad(currentDate.getDate());
        result = result + ' ' + leftPad(currentDate.getHours());
        result = result + ':' + leftPad(currentDate.getMinutes());

        return result;
    }

    let currentDate = new Date(year, month - 1, day, hour, minute, second);
    let value = formattedDate(currentDate);


    function dateIncrease(inputDate, timeUnit, amount) {
        switch (timeUnit) {
            case 'years':
                inputDate.setYear(currentDate.getFullYear() + amount);
                break;
            case 'months':
                inputDate.setMonth(currentDate.getMonth() + amount);
                break;
            case 'days':
                inputDate.setDate(currentDate.getDate() + amount);
                break;
            case 'hours':
                inputDate.setHours(currentDate.getHours() + amount);
                break;
            case 'minutes':
                inputDate.setMinutes(currentDate.getMinutes() + amount);
                break;
            case 'seconds':
                inputDate.setSeconds(currentDate.getSeconds() + amount);
                break;
            default:
                throw new TypeError('date modification parameter is not known: ' + timeUnit);
        }
        return inputDate;
    }

    return {
        'add': function (amount, timeUnit) {
            if (amount < 0) {
                throw new TypeError('amount cannot be less than 0');
            }
            currentDate = dateIncrease(currentDate, timeUnit, amount);
            this.value = formattedDate(currentDate);
            return this;
        },

        'subtract': function (amount, timeUnit) {
            if (amount < 0) {
                throw new TypeError('amount cannot be less than 0');
            }
            currentDate = dateIncrease(currentDate, timeUnit, amount * -1);
            this.value = formattedDate(currentDate);
            return this;
        },
    }
};

