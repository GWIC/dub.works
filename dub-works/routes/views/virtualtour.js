var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'virtualtour';
	locals.page.title = 'Virtual Tour - dub.works';

	view.render('site/virtualtour');

}
