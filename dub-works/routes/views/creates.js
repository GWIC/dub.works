var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.section = 'projects';
    locals.page.title = 'Projects';

    view.render('site/projects');

};
