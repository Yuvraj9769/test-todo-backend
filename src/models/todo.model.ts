import mongoose, { Schema } from "mongoose";

const TODO_STATUSES = ['pending', 'in-progress', 'completed'] as const;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true   // Adding an index for faster search by title

    },
    
    description: {
        type: String,
        trim: true,
        default: ''
    },

    status: {
        type: String,
        enum: TODO_STATUSES, // Restricting status to specific values only.
        default: 'pending',
        index: true   // Adding an index for faster search by status
    },

    // Many todos can belong to one user, so we use a reference to the User model. (Many-to-One relationship)

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true   // Adding an index for faster search by user
    }

}, {
    timestamps: true
});

todoSchema.index({
    title: 1,
    status: 1,
    user: 1,    
})


const Todo = mongoose.model("Todo", todoSchema);

export default Todo;