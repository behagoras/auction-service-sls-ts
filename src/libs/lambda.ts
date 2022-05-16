import middy from "@middy/core"
import middyHttpErrorHandler from "@middy/http-error-handler"
import middyHttpEventNormalizer from "@middy/http-event-normalizer"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler: any) => middy(handler)
.use(middyJsonBodyParser()) // parse JSON body
.use(middyHttpErrorHandler()) // catch errors
.use(middyHttpEventNormalizer()) // normalize event, accidental double-calls or non existent objects
