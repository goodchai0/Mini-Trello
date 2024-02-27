const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        checklist: {
            type: [{
                _id: false,
              label: { type: String, required: true },
              completed: { type: Boolean, default: false }
            }],
            required: true
        },
        due_date: {
            type: String,
        },
        priority:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            default:"to-do"
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Task", taskSchema);
