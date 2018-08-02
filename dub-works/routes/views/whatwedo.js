var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'whatwedo';

	locals.page.title = 'What we do';

	view.render('site/whatwedo');

}
