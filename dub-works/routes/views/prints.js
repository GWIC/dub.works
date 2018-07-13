var keystone = require('keystone')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'prints';

	locals.section = 'prints';
	locals.page.title = 'Prints - dub.works';

	view.render('site/prints');

}
