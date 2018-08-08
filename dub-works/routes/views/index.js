var keystone = require('keystone'),
	moment = require('moment')

var Meetup = keystone.list('Meetup'),
	Post = keystone.list('Post'),
	RSVP = keystone.list('RSVP');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'home';
	locals.meetup = {};
	locals.page.title = 'Welcome to GWIC';

	locals.rsvpStatus = {};

	locals.user = req.user;

	// Organisers
        locals.organisers = [
                { name: 'Nam Tran', image: '/images/organisers/sharkie_400_round.png', twitter: 'obnoxiousDeity', title: 'Web Dev Lead', profile: '/member/nam-tran' },
                { name: 'Becky Shanley', image: '/images/organisers/jedwatson_400_round.png', title: 'Web Dev', profile: '/member/jed-watson' },
                { name: 'Mariamawit Lisanu', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Steve', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Sarah', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Mimosa', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Michael', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Konstantin', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Kaitlin', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Erin', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Connor', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Anni', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Andras', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' }
        ]

	locals.organisers1 = [
                { name: 'Randy', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Erica', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' },
                { name: 'Annamaria', image: '/images/organisers/johnvanderloo_400_round.png', twitter: 'geekyjohn', title: 'Web Dev', profile: '/member/john-van-der-loo' }
	]

	// Load the first, NEXT meetup

	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
			.exec(function(err, activeMeetup) {
				locals.activeMeetup = activeMeetup;
				next();
			});

	});


	// Load the first, PAST meetup

	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'past')
			.sort('-startDate')
			.exec(function(err, pastMeetup) {
				locals.pastMeetup = pastMeetup;
				next();
			});

	});

	// Load an RSVP

	view.on('init', function(next) {

		if (!req.user || !locals.activeMeetup) return next();

		RSVP.model.findOne()
			.where('who', req.user._id)
			.where('meetup', locals.activeMeetup)
			.exec(function(err, rsvp) {
				locals.rsvpStatus = {
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				}
				return next();
			});
	});

	// Decide which to render

	view.on('render', function(next) {

		locals.meetup = locals.activeMeetup || locals.pastMeetup;
		if (locals.meetup) {
			locals.meetup.populateRelated('talks[who] rsvps[who]', next);
		} else {
			next();
		}

	});

	view.render('site/index');

}
