Model.findOneAndUpdate = function (conditions, update, options, callback) {
    _checkContext(this, 'findOneAndUpdate');

    if (typeof options === 'function') {
        callback = options;
        options = null;
    } else if (arguments.length === 1) {
        if (typeof conditions === 'function') {
            const msg = 'Model.findOneAndUpdate(): First argument must not be a function.\n\n'
                + '  ' + this.modelName + '.findOneAndUpdate(conditions, update, options, callback)\n'
                + '  ' + this.modelName + '.findOneAndUpdate(conditions, update, options)\n'
                + '  ' + this.modelName + '.findOneAndUpdate(conditions, update)\n'
                + '  ' + this.modelName + '.findOneAndUpdate(update)\n'
                + '  ' + this.modelName + '.findOneAndUpdate()\n';
            throw new TypeError(msg);
        }
        update = conditions;
        conditions = undefined;
    }
    callback = this.$handleCallbackError(callback);

    let fields;
    if (options) {
        fields = options.fields || options.projection;
    }

    update = utils.clone(update, {
        depopulate: true,
        _isNested: true
    });

    _decorateUpdateWithVersionKey(update, options, this.schema.options.versionKey);

    const mq = new this.Query({}, {}, this, this.collection);
    mq.select(fields);

    return mq.findOneAndUpdate(conditions, update, options, callback);
};