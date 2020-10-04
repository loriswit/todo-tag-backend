const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const cors = require("@koa/cors")

const mongoose = require("mongoose")

const errorHandler = require("./middlewares/error-handler")
const router = require("./middlewares/router")

const uri = process.env.MONGODB_URI ?? "mongodb://localhost/todo"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const app = new Koa()
    .use(errorHandler())
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())

const port = process.env.PORT ?? 80
app.listen(port)

console.info("listening on port " + port)
