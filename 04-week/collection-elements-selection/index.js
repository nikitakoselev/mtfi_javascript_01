const deepCopyFunction = (inObject) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {

    if(arguments.length === 1){
        return collection;
    }

    let data = deepCopyFunction(collection);

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
    let paramsToPreserve = [];

    for (let i = 0; i < arguments.length; i++) {
        paramsToPreserve.push(arguments[i]);
    }

    return function select(inputData) {
        for (let i = 0; i < inputData.length; i++) {
            let client = inputData[i];
            let existingProperties = Object.getOwnPropertyNames(client);
            for (let j = 0; j < existingProperties.length; j++) {
                const currentProperty = existingProperties[j];
                if (!paramsToPreserve.includes(currentProperty)) {
                    delete client[currentProperty];
                }
            }
        }
        return inputData;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty(property)) {
                if (values.includes(data[i][property])) {
                    result.push(data[i]);
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
