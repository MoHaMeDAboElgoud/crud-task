const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		required: true,
		type: Schema.Types.String,
	},
	email: {
		index: true,
		required: true,
		type: Schema.Types.String
	},
	password: {
		required: true,
		type: Schema.Types.String,
        select: false
	},
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };