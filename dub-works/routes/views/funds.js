var keystone = require('keystone');
var FundRequest = keystone.list('FundRequest');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'funds';
	locals.page.title = 'Funding - GWIC';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	view.on('post', { action: 'fundRequest' }, function (next) {

		var application = new FundRequest.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});

	});

	view.render('site/funds');

}

