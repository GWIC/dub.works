var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'ourspace';
	locals.page.title = 'ourspace';

	view.render('site/ourspace');

}
