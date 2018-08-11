var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ===================
 */

var Project = new keystone.List('Project', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Project.add({
	name: { type: String, index: true },
	project_lead: { type: Types.CloudinaryImage },
    project_image_1: { type: Types.CloudinaryImage },
    project_image_2: { type: Types.CloudinaryImage },
	description: { type: Types.Markdown },
	quote: { type: Types.Text }
});


/**
 * Registration
 * ============
 */

Project.defaultColumns = 'name, description';
Project.register();
