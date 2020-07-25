/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    let data = collection;

    for (let i = 1; i < arguments.length; i++) {
        const potentialFunctionName = arguments[i].name;
        if (potentialFunctionName === 'filterIn') {
            data = arguments[i](data);
        }
    }

    for (let i = 1; i < arguments.length; i++) {
        const potentialFunctionName = arguments[i].name;
        if (potentialFunctionName === 'select') {
            data = arguments[i](data);
        }
    }

    return data;
}

/**
 * @params {String[]}
 */
function select() {
    let preservedParams = [];

    for (let i = 0; i < arguments.length; i++) {
        preservedParams.push(arguments[i]);
    }

    return function select(collection) {
        for (let i = 0; i < collection.length; i++) {
            let client = collection[i];
            let existingProperties = Object.getOwnPropertyNames(client);
            for (let j = 0; j < existingProperties.length; j++) {
                const currentProperty = existingProperties[j];
                if(!preservedParams.includes(currentProperty)){
                    delete client[currentProperty];
                }
            }
        }
        return collection;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(inputData) {
        let result = [];
        for (let i = 0; i < inputData.length; i++) {
            if (inputData[i].hasOwnProperty(property)) {
                if (values.includes(inputData[i][property])) {
                    result.push(inputData[i]);
                }
            }
        }

        return result;
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
