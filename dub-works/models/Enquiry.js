var keystone = require('keystone');
var Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true, noedit: true },
	email: { type: Types.Email, required: true, noedit: true },
	phone: { type: String, noedit: true },
	enquiryType: { type: Types.Select, options: [
		{ value: 'volunteer',	label: "I want to volunteer" },
		{ value: 'idea',	label: "I have an idea/suggestion" },
		{ value: 'question',	label: "I've got a question" },
		{ value: 'other',	label: "Something else..." },
	], required: true, noedit: true },
	message: { type: Types.Textarea, required: true, noedit: true },
});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
