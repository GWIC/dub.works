var keystone = require('keystone');

var Organisation = keystone.list('Organisation');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'About dub.works';

	locals.fellows_distinction = [
		{ name: 'Amb. Adras Simonyi, Ph.D', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
	]

	locals.experts = [
		{ name: 'Annamaria Konya Tannon', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Randy Graves, Ph.D', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Erica Wortham, Ph.D', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
	]
	locals.fellows = [
		{ name: 'Konstantin Mitic', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Sarah Shavin', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Michael Ready', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Isabella Sardegna', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
		{ name: 'Kaitlin Santiago', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
		{ name: 'Connor West', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie' },
		{ name: 'Steven Brunetto', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
		{ name: 'Erin Flynn', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
		{ name: 'Logan Bartholomew', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
		{ name: 'Mimosa Giamanco', image: '/images/organisers/profile-placeholder_400.jpg', title: '', profile: '/member/sharkie'},
	]

	view.query('organisations', Organisation.model.find().sort('name'), 'members');

	view.render('site/about');
}
