var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'requestspace';
	locals.page.title = 'Request Space';

	view.render('site/requestspace');

}
