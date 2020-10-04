const Todo = require("../models/todo")
const Tag = require("../models/tag")

module.exports = {
    async getTodo(id, ctx, next) {
        ctx.todo = await Todo.findById(id).populate("tags").exec()
        if(!ctx.todo)
            ctx.throw(404, {"error": "Todo not found"})

        return next()
    },

    async readAll(ctx) {
        ctx.body = (await Todo.find().populate("tags")).map(e => e.export())
    },

    async deleteAll(ctx) {
        await Todo.deleteMany()
        ctx.status = 204
    },

    async create(ctx) {
        const todo = new Todo(ctx.request.body)
        await todo.save()

        ctx.status = 303
        ctx.set("Location", todo.export().url)
    },

    async read(ctx) {
        ctx.body = ctx.todo.export()
    },

    async update(ctx) {
        Object.assign(ctx.todo, ctx.request.body)
        await ctx.todo.save()
        ctx.body = ctx.todo.export()
    },

    async delete(ctx) {
        await ctx.todo.delete()
        ctx.status = 204
    },

    async addTag(ctx) {
        const tag = await Tag.findById(ctx.request.body.id)
        if(!tag)
            ctx.throw(404, {"error": "Tag not found"})

        ctx.todo.tags.push(tag)
        await ctx.todo.save()

        ctx.body = ctx.todo.export()
        ctx.status = 201
    },

    async getTags(ctx) {
        ctx.body = ctx.todo.export().tags
    },

    async removeTag(ctx) {
        ctx.body = ctx.tag

        ctx.todo.tags.splice(ctx.todo.tags.indexOf(ctx.tag), 1)
        await ctx.todo.save()

        ctx.status = 200
    },

    async deleteTags(ctx) {
        ctx.todo.tags = []
        await ctx.todo.save()

        ctx.status = 200
    },
}
