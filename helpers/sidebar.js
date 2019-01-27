const stats = require('./stats'),
    images = require('./images'),
    comments = require('./comments');

module.exports = (ViewModel, callback) => {
    ViewModel.sidebar = {
        stats: stats(),
        popular: images.popular(),
        comments: comments.newest()
    };

    callback(ViewModel);
};