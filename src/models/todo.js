const mongoose = require("mongoose")
const os = require("os")

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 1},
    order: Number,
    completed: {type: Boolean, default: false},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
})

todoSchema.methods.export = function(withTags = true) {
    const data = {
        id: this._id,
        title: this.title,
        order: this.order,
        completed: this.completed,
        url: "http://" + os.hostname + "/todos/" + this._id,
    }
    if(withTags)
        data.tags = this.populated("tags") ? this.tags.map(e => e.export()) : this.tags

    return data
}

module.exports = mongoose.model("Todo", todoSchema)
