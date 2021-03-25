Document.prototype.updateOne = function updateOne(doc, options, callback) {
    const query = this.constructor.updateOne({ _id: this._id }, doc, options);
    query.pre(cb => {
        this.constructor._middleware.execPre('updateOne', this, [this], cb);
    });
    query.post(cb => {
        this.constructor._middleware.execPost('updateOne', this, [this], {}, cb);
    });

    if (this.$session() != null) {
        if (!('session' in query.options)) {
            query.options.session = this.$session();
        }
    }

    if (callback != null) {
        return query.exec(callback);
    }

    return query;
};