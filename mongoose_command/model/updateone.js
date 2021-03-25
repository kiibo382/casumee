Model.updateOne = function updateOne(conditions, doc, options, callback) {
    _checkContext(this, 'updateOne');

    return _update(this, 'updateOne', conditions, doc, options, callback);
};