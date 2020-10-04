const mongoose = require("mongoose")
const os = require("os")

const tagSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 1},
})

tagSchema.methods.export = function() {
    return {
        id: this._id,
        title: this.title,
        url: "http://" + os.hostname() + "/tags/" + this._id,
        todos: this.todos
    }
}

module.exports = mongoose.model("Tag", tagSchema)
