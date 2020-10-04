const mongoose = require("mongoose")

module.exports = function() {
    return async function(ctx, next) {
        try {
            await next()
        } catch(err) {
            if(err instanceof mongoose.Error.ValidationError) {
                ctx.throw(422, err)
            }
            else if(err instanceof mongoose.Error || err.name === "MongoError") {
                ctx.throw(400, err)
            }
            else {
                ctx.throw(500, err)
            }
        }
    }
}
