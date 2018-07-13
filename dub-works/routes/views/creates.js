var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.section = 'creates';
    locals.page.title = 'Projects - dub.works';

    view.render('site/creates');

};
