var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'pastevents';

	locals.page.title = 'Past Events';

	view.render('site/pastevents');

}
