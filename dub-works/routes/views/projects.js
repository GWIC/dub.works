var keystone = require('keystone');

var Project = keystone.list('Project');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.section = 'projects';
    locals.page.title = 'Projects';

    view.query('Project', Project.model.find().sort('name'));

    view.render('site/projects');
};
