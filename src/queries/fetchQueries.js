import {SERVER_URL} from '../util/variables.js'

async function getUserInfo() {
    return fetch(`${SERVER_URL}/jwt/user`, 
        {credentials:"include"})
        .then(res=>res.json())
        .catch(err => console.log(err));
}

async function fetchListOfTopics(search, page) {
    if (!search) search = '';
    const res = await fetch(`${SERVER_URL}/get/topics?` + new URLSearchParams({
        search: search,
        page: page
    }), 
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

async function insertTopic(newTopic) { 
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            topic: newTopic
        })
    };
    return fetch(`${SERVER_URL}/insert/topic`, requestOptions)
        .then(res => res.json())
        .catch(err =>  {console.log(err)});
}

async function insertNewComment(newComment, topicId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            comment: newComment,
            topicId: topicId
        })
    };
    return fetch(`${SERVER_URL}/insert/comment`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log(err));
}

async function insertNewReply(newReply, commentId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
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

async function deleteComment(commentId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentId: commentId
        })
    }

    return fetch(`${SERVER_URL}/remove/comment`, requestOptions)
        .then(res=>res.json())
        .then(res=> res)
        .catch(err=> console.log("deleteComment: ", err));
}

async function removeTopic(topicId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topicId: topicId
        })
    }
    return fetch(`${SERVER_URL}/remove/topic`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log("removeTopic: ", err));
}

async function removeReply(replyId) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            replyId: replyId
        })
    };
    return fetch(`${SERVER_URL}/remove/reply`, requestOptions)
        .then(res=>res.json())
        .catch(err=> console.log("removeReply: ", err));
}

async function updateTopic(newTopic, topicId) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
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

async function updateReply(reply, replyId) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
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