var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'About dub.works';

	locals.organisers = [
		{ name: 'Andras', image: '/images/organisers/sharkie_400_round.png', twitter: 'twalve', title: 'Ambassador', profile: '/member/sharkie' },
	]

	locals.organisers1 = [
		{ name: 'Annamaria Konya Tannon', image: '/images/organisers/sharkie_400_round.png', title: 'Co-Director', profile: '/member/sharkie' },
		{ name: 'Rodney Lake', image: '/images/organisers/sharkie_400_round.png', title: 'Co-Director', profile: '/member/sharkie' },
		{ name: 'Randy Graves', image: '/images/organisers/sharkie_400_round.png', title: 'Innovation Challenge Lead', profile: '/member/sharkie' },
		{ name: 'Erica Cusi Worthan', image: '/images/organisers/sharkie_400_round.png', title: 'Program Lead', profile: '/member/sharkie' },
		{ name: 'Brian Wright', image: '/images/organisers/sharkie_400_round.png', title: 'Data Science Director', profile: '/member/sharkie' },
		{ name: 'Johnny Chou', image: '/images/organisers/sharkie_400_round.png', title: 'Program Associate', profile: '/member/sharkie' },
		{ name: 'Bojana Jankovic', image: 'images/organisers/sharkie_400_round.png', title: 'Program Associate', profile: '/member/sharkie' }
	]
	locals.organisers2 = [
		{ name: 'Sarah Shavin', image: '/images/organisers/sharkie_400_round.png', title: 'Creative Fellow', profile: '/member/sharkie' },
		{ name: 'Ryan Steed', image: '/images/organisers/sharkie_400_round.png', title: 'Technology Fellow', profile: '/member/sharkie'},
		{ name: 'Michael Ready', image: '/images/organisers/sharkie_400_round.png', title: 'Student Innovation', profile: '/member/sharkie' },
		{ name: 'Connor West', image: '/images/organisers/sharkie_400_round.png', title: 'Accessibility Innovation', profile: '/member/sharkie' },
		{ name: 'Konstantin Mitic', image: '/images/organisers/sharkie_400_round.png', title: 'Student Innovation', profile: '/member/sharkie' },
		{ name: 'Sebastian Lora', image: '/images/organisers/sharkie_400_round.png', title: 'Diversity and Inclusion', profile: '/member/sharkie' },
		{ name: 'Isabella Sardegna', image: '/images/organisers/sharkie_400_round.png', title: 'Community Relations', profile: '/member/sharkie'},
	]

	view.render('site/about');
}
