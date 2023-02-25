const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    userId: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
	name: {
		required: true,
		type: Schema.Types.String,
	},
    description: {
		required: false,
		type: Schema.Types.String,
	},
});


const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };