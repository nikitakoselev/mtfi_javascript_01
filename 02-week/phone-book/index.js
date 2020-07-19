// Телефонная книга
let phoneBook = [];

/**
 * @param {String} input
 * @returns {*} - результат зависит от команды
 */
module.exports = function (input) {

    function addContact(splitData) {
        let name = splitData[1];
        let phoneNumbers = splitData[2].split(',');
        for (let i = 0; i < phoneBook.length; i++) {
            if (phoneBook[i][0] === name) {
                for (let j = 0; j < phoneNumbers.length; j++) {
                    phoneBook[i][1].push(phoneNumbers[j]);
                }
                return phoneBook;
            }
        }
        //if we are here, it is a new phone number
        phoneBook.push([name, phoneNumbers]);
        return phoneBook;
    }


    function removePhone(splitData) {
        let phoneToRemove = splitData[1];
        let phoneExisted = false;

        for (let i = 0; i < phoneBook.length; i++) {
            phoneExisted = phoneExisted || (phoneBook[i][1].filter((element) => element === phoneToRemove).length > 0) ? true : false;
            phoneBook[i][1] = phoneBook[i][1].filter((element) => !(element === phoneToRemove));
        }
        return phoneExisted;
    }

    function showContacts() {
        let result = [];

        for (let i = 0; i < phoneBook.length; i++) {
            let interimResult = '';
            interimResult += phoneBook[i][0] + ': ';
            for (let j = 0; j < phoneBook[i][1].length; j++) {
                interimResult += phoneBook[i][1][j];
                if (j < phoneBook[i][1].length - 1) {
                    interimResult += ', ';
                }
            }
            if (phoneBook[i][1].length > 0) {
                result.push(interimResult);
            }
        }
        return result.sort();
    }

    let splitData = input.split(' ');
    switch (splitData[0]) {
        case 'ADD':
            return addContact(splitData);
        case 'REMOVE_PHONE':
            return removePhone(splitData);
        case 'SHOW':
            return showContacts();
    }
};
