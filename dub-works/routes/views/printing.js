var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'printing';

	locals.section = 'printing';
	locals.page.title = 'Prints - dub.works';

	view.render('site/printing');

}
