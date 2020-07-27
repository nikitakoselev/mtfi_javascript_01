module.exports = {

    /**
     * @param {String} eventName
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (eventName, subscriber, handler) {
        let observer = this[eventName];
        observer = (typeof observer != 'undefined' && Array.isArray(observer)) ? observer : [];
        observer.push({subscriber: subscriber, handler: handler});

        this[eventName] = observer;

        return this;
    },

    /**
     * @param {String} eventName
     * @param {Object} subscriber
     */
    off: function (eventName, subscriber) {
        let observer = this[eventName];
        if (Array.isArray(observer)) {
            observer = observer.filter(element => element.subscriber != subscriber);
        }b

        this[eventName] = observer;
        return this;
    },


    /**
     * @param {String} eventName
     */
    emit: function (eventName) {
        let observer = this[eventName];

        if (Array.isArray(observer)) {
            for (let i = 0; i < observer.length; i++) {
                observer[i].handler.bind(observer[i].subscriber)();
            }
        }
        return this;
    }
};
