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
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}

const handleUpdateTask = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `課題の追加 by ${user}`
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    let text = "";
    backlog.content.changes.forEach((item)=>{
        if(item.field === "status"){
            text = text + "課題のステータスが更新されました。\n";
        }else if(item.field === "description"){
            text = text + "課題の概要が更新されました。\n";
        }else{
            text = text + "課題が更新されました。\n";
        }
    })

    return attachment(pretext,title,title_link,text)
}

const handleDelTask = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `課題の削除 by ${user}`
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}
const handleAddWiki = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    // https://chatboxinc.backlog.jp/alias/wiki/42405
    const url = "alias/wiki/" + backlog.content.id

    const pretext = `Wikiの追加 by ${user}`
    const title = `[${projectKey} - ${keyId}]`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}
const handleUpdateWiki = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    // https://chatboxinc.backlog.jp/alias/wiki/42405
    const url = "alias/wiki/" + backlog.content.id

    const pretext = `Wikiの更新 by ${user}`
    const title = `[${projectKey} - ${keyId}]`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}
const handleAddFile = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `ファイルの追加 by ${user}`
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}
const handleDelFile = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `ファイルの削除 by ${user}`
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}
const handleDefault = (backlog)=>{

    const projectKey = backlog.project.projectKey;
    const keyId = backlog.content.key_id || backlog.content.name;
    const summary = backlog.content.summary;
    const user = backlog.createdUser.name;
    const body = (backlog.content.comment)?
        backlog.content.comment.content:
        backlog.content.description;
    const url = `view/${projectKey}-${keyId}`

    const pretext = `その他の処理 by ${user}`
    const title = `[${projectKey} - ${keyId}] - ${summary}`
    const title_link = "http://chatboxinc.backlog.jp/" + url;
    const text = body;

    return attachment(pretext,title,title_link,text)
}

module.exports.attachment = (backlog)=>{
    switch (backlog.type){
        case 1:
            return handleAddTask(backlog);break;
        case 2:
            return handleUpdateTask(backlog);break;
        case 3:
            return handleDelTask(backlog);break;
        case 5:
            return handleAddWiki(backlog);break;
        case 6:
            return handleUpdateWiki(backlog);break;
        case 8:
            return handleAddFile(backlog);break;
        case 9:
            return handleDelFile(backlog);break;
        default:
            return handleDefault(backlog);break;
    }
}