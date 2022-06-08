import axios from 'axios';
import { ADD_POST,
        DELETE_POST,
        UPDATE_LIKES,
        GET_POSTS,
        POST_ERROR,
        GET_POST,
        ADD_COMMENT,
        DELETE_COMMENT } from './types';
import { setAlert } from './alert';

// GET posts
export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Like
export const addLike = (postID) => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${postID}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postID, likes: res.data }
        });
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Remove Like
export const removeLike = (postID) => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/unlike/${postID}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postID, likes: res.data }
        });
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete post
export const deletePost = (postID) => async dispatch => {
    try{
        await axios.delete(`/api/posts/${postID}`);

        dispatch({
            type: DELETE_POST,
            payload: postID
        });

        dispatch(setAlert('Post Removed', 'success'));

    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add post
export const addPost = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));

    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// GET post
export const getPost = (id) => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));

    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Comment
export const deleteComment = (postID, commentID) => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/comment/${postID}/${commentID}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Removed', 'success'));

    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}