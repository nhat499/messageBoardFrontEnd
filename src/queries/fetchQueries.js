import {SERVER_URL} from '../util/variables.js'

async function getUserInfo() {
    return fetch(`${SERVER_URL}/jwt/user`, 
        {credentials:"include"})
        .then(res=>res.json())
        .catch(err => console.log(err));
}

async function fetchListOfTopics(search) {
    console.log(search);
    if (!search) search = '';
    const res = await fetch(`${SERVER_URL}/get/topics?search=${search}`, 
        {credentials:"include"})
        .then(res=>res.json());
    if(res) return res;
    else throw new Error(res);
}

async function fetchSingleTopic(topicId) {
    const res = await fetch(`${SERVER_URL}/get/topic/${topicId}`,
    {credentials:"include"})
    .then(res => res.json());
    if (res) return res;
    else throw new Error(res);

}

async function fetchListOfComments(topicId) {
    const res = await fetch(`${SERVER_URL}/get/comment/${topicId}`, 
    {credentials:"include"})
    .then(res=>res.json());
    if (res) return res;
    else throw new Error(res);
}

async function fetchListOfReply(commentId) {
    const res = await fetch(`${SERVER_URL}/get/reply/${commentId}`, 
        {credentials:"include"})
        .then(res=>res.json());
    if (res) return res;
    else throw new Error(res);
}

async function insertTopic(newTopic, userId) { // always userId 1
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            topic: newTopic
        })
    };
    return fetch(`${SERVER_URL}/insert/topic`, requestOptions)
        .then(res => res.json())
        .catch(err =>  {console.log(err)});
}

async function insertNewComment(newComment, topicId, userId) { // always userId 1
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            comment: newComment,
            topicId: topicId
        })
    };
    return fetch(`${SERVER_URL}/insert/comment`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log(err));
}

async function insertNewReply(newReply, commentId, userId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            reply: newReply,
            commentId: commentId
        })
    };
    return fetch(`${SERVER_URL}/insert/reply`, requestOptions)
        .then(res=>res.json())
        .catch(err=>console.log("insertNewReply: ", err));
}

async function insertLikesTopicCommentReply(topicCommentReplyId, topicCommentReply) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            topicCommentReplyId: topicCommentReplyId,
            topicCommentReply: topicCommentReply
        })
    };
    return fetch(`${SERVER_URL}/insert/like`, requestOptions)
        .then(res=>res.json())
        .catch(err => console.log('insertLikesTopicCommentReply:', err));
}

async function deleteLikesTopicCommentReply(topicCommentReplyId, topicCommentReply) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            topicCommentReplyId: topicCommentReplyId,
            topicCommentReply: topicCommentReply
        })
    };
    return fetch(`${SERVER_URL}/remove/like`, requestOptions)
        .then(res=>res.json())
        .catch(err => console.log('deleteLikesTopicCommentReply:', err));
}

async function deleteComment(commentId, userId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            commentId: commentId
        })
    }

    return fetch(`${SERVER_URL}/remove/comment`, requestOptions)
        .then(res=>res.json())
        .then(res=> res)
        .catch(err=> console.log("deleteComment: ", err));
}

async function removeTopic(topicId, userId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            topicId: topicId
        })
    }
    return fetch(`${SERVER_URL}/remove/topic`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log("removeTopic: ", err));
}

async function removeReply(replyId, userId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId, //CHANGE THIS LATER!!
            replyId: replyId
        })
    };
    return fetch(`${SERVER_URL}/remove/reply`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log("removeReply: ", err));
}

async function updateTopic(newTopic, topicId, userId) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId: userId, // CHANGE THIS LATER!!
            topicId: topicId,
            topic: newTopic
        })
    };
    return fetch(`${SERVER_URL}/edit/topic`, requestOptions)
        .then(res=> res.json())
        .catch(err=> console.log("updateTopic: ", err));
}

async function updateComment(newComment, commentId) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            commentId: commentId,
            comment: newComment
        })
    };
    return fetch(`${SERVER_URL}/edit/comment`, requestOptions)
        .then(res=>res.json())
        .then(res=>res)
        .catch(err=> console.log("update comment: ", err));
}

async function updateReply(reply, replyId, userId) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId: userId, // CHANGE THIS LATER!!
            replyId: replyId,
            reply: reply
        })
    };
    return fetch(`${SERVER_URL}/edit/reply`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log("update reply: ", err));
}

async function signIn() {
    return fetch(`${SERVER_URL}/signIn/start`)
        .then(res=> res.json())
        .catch(err=> console.log('sigIn: ', err));
}



    
export {
    fetchListOfTopics, 
    insertTopic,
    fetchListOfComments,
    fetchListOfReply,
    insertNewComment,
    insertNewReply,
    deleteComment,
    removeTopic,
    removeReply,
    updateTopic,
    updateComment,
    updateReply,
    signIn,
    getUserInfo,
    fetchSingleTopic,
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply
};