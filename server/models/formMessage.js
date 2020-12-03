import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
	userId: String,
	name: String,
	email: String,
	message: String,
	projectTitle: String,
	projectLink: {
		type: String,
		required: true
	},
	liveLink: {
		type: String
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	}
});

const FormMessage = mongoose.model('FormMessage', formSchema);

export default FormMessage;