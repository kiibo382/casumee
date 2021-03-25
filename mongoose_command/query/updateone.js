Query.prototype.updateOne = function (conditions, doc, options, callback) {
    if (typeof options === 'function') {
        // .update(conditions, doc, callback)
        callback = options;
        options = null;
    } else if (typeof doc === 'function') {
        // .update(doc, callback);
        callback = doc;
        doc = conditions;
        conditions = {};
        options = null;
    } else if (typeof conditions === 'function') {
        // .update(callback)
        callback = conditions;
        conditions = undefined;
        doc = undefined;
        options = undefined;
    } else if (typeof conditions === 'object' && !doc && !options && !callback) {
        // .update(doc)
        doc = conditions;
        conditions = undefined;
        options = undefined;
        callback = undefined;
    }

    return _update(this, 'updateOne', conditions, doc, options, callback);
};