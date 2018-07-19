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
		{ name: 'Annamaria Konya tannon', image: '/images/organisers/sharkie_400_round.png', title: 'Evangelist', profile: '/member/sharkie' },
		{ name: 'Rodney Lake', image: '/images/organisers/sharkie_400_round.png', title: 'Investor', profile: '/member/sharkie' },
		{ name: 'Erica Worthan', image: '/images/organisers/sharkie_400_round.png', title: 'ethnographer, building creative infrastructure and curriculum', profile: '/member/sharkie' },
		{ name: 'Randy', image: '/images/organisers/sharkie_400_round.png', title: 'UNKNOWN', profile: '/member/sharkie' },
		{ name: 'Bojana Jankovic', image: '/images/organisers/sharkie_400_round.png', title: 'UNKNOWN', profile: '/member/sharkie' },
		{ name: 'Johnny Chou', image: 'images/organisers/sharkie_400_round.png', title: 'UNKNOWN', profile: '/member/sharkie' }
	]
	locals.organisers2 = [
		{ name: 'Sarah Shavin', image: '/images/organisers/sharkie_400_round.png', title: 'side projects', profile: '/member/sharkie' },
		{ name: 'Konstantin Mitic', image: '/images/organisers/sharkie_400_round.png', title: 'Product development, 3D-printer enthusiast', profile: '/member/sharkie' },
		{ name: 'Michael Ready', image: '/images/organisers/sharkie_400_round.png', title: 'operation expert', profile: '/member/sharkie' },
		{ name: 'Isabella Sardegna', image: '/images/organisers/sharkie_400_round.png', title: 'Community outreach Fellow', profile: '/member/sharkie'},
		{ name: 'Ryan Steed', image: '/images/organisers/sharkie_400_round.png', title: 'Developer, analyst, modeler, co-founder', profile: '/member/sharkie'},
		{ name: 'Sebastian Lora', image: '/images/organisers/sharkie_400_round.png', title: 'mechanical engineering patent law', profile: '/member/sharkie' },
		{ name: 'Joseph Schiarizzi', image: '/images/organisers/sharkie_400_round.png', title: 'founder of fourth wave and developer with goals', profile: '/member/sharkie' }
	]
 
	view.render('site/about');

}
