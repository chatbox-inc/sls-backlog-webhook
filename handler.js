'use strict';
const Backlog = require("./src/backlog")

const topicArn = process.env.SLS_TOPICARN

module.exports.general = (event, context, cb)=>{
    const backlog = new Backlog(topicArn,"#excom")
    backlog.run(event, context, cb)
}

module.exports.chatbox = (event, context, cb)=>{
    const backlog = new Backlog(topicArn,"#chatbox")
    backlog.run(event, context, cb)
}