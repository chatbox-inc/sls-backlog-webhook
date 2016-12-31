'use strict';
const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const backlogAttachment = require("./backlog_attachments")

class Backlog{

    constructor(topicArn,channel)
    {
        this.topicArn = topicArn
        this.channel = channel
    }

    message(attachment)
    {
        return JSON.stringify({
            channel: this.channel,
            text:"Backlogの更新をお知らせします。",
            attachments:[attachment],
        })
    }

    getDoneCb(cb)
    {
        return (err, result) => cb(null, {
            statusCode: err ? '500' : '200',
            body: err ? err.message : JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    run(event, context, cb)
    {
        const backlogData = JSON.parse(event.body);

        const attachment = backlogAttachment.attachment(backlogData);

        const Message = this.message(attachment)
        const TopicArn = this.topicArn
        const done = this.getDoneCb(cb)

        sns.publish({
            Message,
            Subject: "SLS BACKLOG WEBHOOK APPLICATION",
            TopicArn
        }, done)
    }
}

module.exports = Backlog
