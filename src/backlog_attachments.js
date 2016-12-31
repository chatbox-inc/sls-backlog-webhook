"use strict"

const attachment = (pretext,title,title_link,text)=>{

    const color = "#36a64f"
    return {
        color,pretext,title,title_link,text
    }
}

const handleAddTask = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `課題の追加 by ${user}`
    const title = `[${projectKey} - ${keyId}}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}

const handleUpdateTask = (backlog)=>{
    return handleAddTask(backlog)
}
const handleDelTask = (backlog)=>{
    return handleAddTask(backlog)
}
const handleAddWiki = (backlog)=>{
    return handleAddTask(backlog)
}
const handleUpdateWiki = (backlog)=>{
    return handleAddTask(backlog)
}
const handleAddFile = (backlog)=>{
    return handleAddTask(backlog)
}
const handleDelFile = (backlog)=>{
    return handleAddTask(backlog)
}
const handleDefault = (backlog)=>{
    return handleAddTask(backlog)
}

module.exports.attachment = (backlog)=>{
    switch (backlog.type){
        case 1:
            return handleAddTask(backlog);break;
        case 2:
            return handleUpdateTask(backlog);break;
        case 3:
            return handleUpdateTask(backlog);break;
        case 5:
            return handleAddWiki(backlog);break;
        case 6:
            return handleUpdateWiki(backlog);break;
        case 8:
            return handleAddFile(backlog);break;
        case 9:
            return handleAddFile(backlog);break;
        default:
            return handleDefault(backlog);break;
    }
}