var keystone = require('keystone');
var Types = keystone.Field.Types;

var FundRequest = new keystone.List('FundRequest', {
	nocreate: true,
});

FundRequest.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	website: { type: String },
	concept: { type: Types.Textarea, required: true },
	customers: { type: Types.Textarea },
	financials: { type: Types.Textarea },
	impact: { type: Types.Textarea },
	sustainability: { type: Types.Textarea },
	needs: { type: Types.Textarea }
});

FundRequest.track = true;
FundRequest.defaultSort = '-createdAt';
FundRequest.defaultColumns = 'name, email, concept, createdAt';
FundRequest.register();

