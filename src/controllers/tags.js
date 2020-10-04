const Tag = require("../models/tag")
const Todo = require("../models/todo")

module.exports = {
    async getTag(id, ctx, next) {
        ctx.tag = await Tag.findById(id)
        if(!ctx.tag)
            ctx.throw(404, {"error": "Tag not found"})

        const todos = await Todo.find({ tags: ctx.tag })
        ctx.tag.todos = todos.map(e => e.export(false))
        return next()
    },

    async readAll(ctx) {
        ctx.body = (await Tag.find()).map(e => e.export())
    },

    async deleteAll(ctx) {
        await Tag.deleteMany()
        ctx.status = 204
    },

    async create(ctx) {
        const tag = new Tag(ctx.request.body)
        await tag.save()

        ctx.status = 303
        ctx.set("Location", tag.export().url)
    },

    async read(ctx) {
        ctx.body = ctx.tag.export()
    },

    async update(ctx) {
        Object.assign(ctx.tag, ctx.request.body)
        await ctx.tag.save()
        ctx.body = ctx.tag.export()
    },

    async delete(ctx) {
        await ctx.tag.remove()
        ctx.status = 204
    },

    async getTodos(ctx) {
        ctx.body = ctx.tag.todos
    }
}
