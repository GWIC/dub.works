var _ = require('lodash');
var querystring = require('querystring');
var keystone = require('keystone');


/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home',	        key: 'home',		    href: '/' },
		{ label: 'about',	        key: 'about',		    href: '/about',     pages: [
			{ label: 'what we do',	     key: 'whatwedo',		     href: '/about#what-we-do' },
			{ label: 'our community',	     key: 'ourcommunity',	     href: '/about#our-community' },
			{ label: 'our team',		     key: 'ourteam',	       href: '/about#our-team' },
			{ label: 'our partners',		key: 'ourpartners',			href: '/about#our-partners' }
		] },
		{ label: 'events',	      key: 'events',		  href: '/events',     pages: [
			{ label: 'upcoming',	 key: 'upcomingevents',  href: '/events#upcoming-events' },
			{ label: 'past events',      key: 'pastevents',      href: '/events#past-events' }
		] },
		{ label: 'projects',	    key: 'projects', 	  href:'/projects' },
		//{ label: 'Members',	key: 'members',		href: '/members' },
		//{ label: 'printing',	key: 'prints',		href: '/prints' },
		{ label: 'funding',	      key: 'funds',		    href: '/funds' },
		{ label: 'our space',	    key: 'our space',   href: '/ourspace',  		pages: [
			{ label: '3D printing',     key: 'printing',        href: '/ourspace#3d-printing' },
			{ label: 'reserve space',     key: 'reserve-space',        href: '/ourspace#reserve-space' }
		] },
		{ label: 'blogs',	        key: 'blog',	  	  href: '/blog' },
		{ label: 'contact',	      key: 'contact',		  href: '/contact' }
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
