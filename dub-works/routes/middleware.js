var _ = require('lodash');
var querystring = require('querystring');
var keystone = require('keystone');


/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home',	key: 'home',		href: '/' },
		{ label: 'about',	key: 'about',		pages: [
			{ label: 'what we do',      subkey: 'whatwedo',     href: '/about' },
			{ label: 'our history',     subkey: 'ourhistory',     href: '/about' },
			{ label: 'our team',       subkey: 'ourteam',      href: 'about' }
		] },
			{ label: 'events',	key: 'events',		pages: [
			{ label: 'upcoming events',      subkey: 'upcomingevents',     href: '/events' },
			{ label: 'request space',     subkey: 'requestspace',     href: '/events' },
			{ label: 'past events',       subkey: 'pastevents',      href: '/events' }
		] },
		{ label: 'projects',	key: 'creates', 	href:'creates' },
		//{ label: 'Members',	key: 'members',		href: '/members' },
		//{ label: 'printing',	key: 'prints',		href: '/prints' },
		{ label: 'funding',	key: 'funds',		href: '/funds' },
		{ label: 'dub.works',	key: 'dub.works',		pages: [
			{ label: 'virtual tour',      subkey: 'virtual tour',     href: '/dubworks' },
			{ label: '3D printing',     subkey: 'printing',     href: '/dubworks' }
		] },
		{ label: 'blogs',	key: 'blog',		href: '/blog' },
		{ label: 'contact',	key: 'contact',		href: '/contact' }
	];

	locals.user = req.user;

	locals.basedir = keystone.get('basedir');

	locals.page = {
		title: 'dub.works',
		path: req.url.split("?")[0] // strip the query - handy for redirecting back to the page
	};

	locals.qs_set = qs_set(req, res);

	if (req.cookies.target && req.cookies.target == locals.page.path) res.clearCookie('target');

	var bowser = require('../lib/node-bowser').detect(req);

	locals.system = {
		mobile: bowser.mobile,
		ios: bowser.ios,
		iphone: bowser.iphone,
		ipad: bowser.ipad,
		android: bowser.android
	}

	next();

};


/**
	Make sponsors universally available
*/

exports.loadSponsors = function(req, res, next) {
	keystone.list('Organisation').model.find().sort('name').exec(function(err, sponsors) {
		if (err) return next(err);
		req.sponsors = sponsors;
		res.locals.sponsors = sponsors;
		next();
	});
}


/**
	Inits the error handler functions into `req`
*/

exports.initErrorHandlers = function(req, res, next) {
	res.err = function(err, title, message) {
		res.status(500).render('errors/500', {
			err: err,
			errorTitle: title,
			errorMsg: message
		});
	}
	res.notfound = function(title, message) {
		res.status(404).render('errors/404', {
			errorTitle: title,
			errorMsg: message
		});
	}
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/signin');
	} else {
		next();
	}
}

/**
	Returns a closure that can be used within views to change a parameter in the query string
	while preserving the rest.
*/

var qs_set = exports.qs_set = function(req, res) {
	return function qs_set(obj) {
		var params = _.clone(req.query);
		for (var i in obj) {
			if (obj[i] === undefined || obj[i] === null) {
				delete params[i];
			} else if (obj.hasOwnProperty(i)) {
				params[i] = obj[i];
			}
		}
		var qs = querystring.stringify(params);
		return req.path + (qs ? '?' + qs : '');
	}
}
