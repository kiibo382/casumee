Model.findOne = function findOne(conditions, projection, options, callback) {
    _checkContext(this, 'findOne');

    if (typeof options === 'function') {
        callback = options;
        options = null;
    } else if (typeof projection === 'function') {
        callback = projection;
        projection = null;
        options = null;
    } else if (typeof conditions === 'function') {
        callback = conditions;
        conditions = {};
        projection = null;
        options = null;
    }

    const mq = new this.Query({}, {}, this, this.collection);
    mq.select(projection);

    mq.setOptions(options);
    if (this.schema.discriminatorMapping &&
        this.schema.discriminatorMapping.isRoot &&
        mq.selectedInclusively()) {
        mq.select(this.schema.options.discriminatorKey);
    }

    callback = this.$handleCallbackError(callback);

    return mq.findOne(conditions, callback);
};