const router = require("koa-router")
const todos = require("../controllers/todos")
const tags = require("../controllers/tags")

module.exports = router()

    .param("todo_id", todos.getTodo)
    .param("tag_id", tags.getTag)

    // Todos
    .get("/todos", todos.readAll)
    .del("/todos", todos.deleteAll)

    .post("/todos", todos.create)
    .get("/todos/:todo_id", todos.read)
    .patch("/todos/:todo_id", todos.update)
    .del("/todos/:todo_id", todos.delete)

    .post("/todos/:todo_id/tags", todos.addTag)
    .get("/todos/:todo_id/tags", todos.getTags)
    .del("/todos/:todo_id/tags/:tag_id", todos.removeTag)
    .del("/todos/:todo_id/tags", todos.deleteTags)

    // Tags
    .get("/tags", tags.readAll)
    .del("/tags", tags.deleteAll)

    .post("/tags", tags.create)
    .get("/tags/:tag_id", tags.read)
    .patch("/tags/:tag_id", tags.update)
    .del("/tags/:tag_id", tags.delete)

    .get("/tags/:tag_id/todos", tags.getTodos)
