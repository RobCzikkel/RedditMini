import { createSlice } from '@reduxjs/toolkit';

export const fetchComments = (id, permalink) => async(dispatch) => {
    try {
        dispatch(loadStarted())
        const response = await fetch(`https://www.reddit.com/${permalink}.json`)
        const data = await response.json()
        const comments = data[1].data.children.map(comment => comment.data)
        dispatch(loadComments({id, comments}))
    } catch(err) {
        dispatch(loadFailed())
    }
}

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {},
        showComments: false,
        loadFailed: false,
        isLoading: false,
        permalink: '',
        id: ''
    },
    reducers: {
        loadComments(state, action) {
            state.comments[action.payload.id] = action.payload.comments
            state.isLoading = false
        },
        loadFailed(state, action) {
            state.loadFailed = action.payload
        },
        loadStarted(state, action) {
            state.isLoading = true
        },
        setPermaLink(state,action) {
            state.permalink = action.payload
        },
        setId(state,action) {
            state.id = action.payload
        },
        setShowComments(state,action) {
            state.showComments = action.payload
        }
            
    }
})

export const { loadComments, loadFailed, loadStarted, setPermaLink, setShowComments, setId } = commentSlice.actions

export const selectPermaLink = (state) => state.comments.permalink;
export const selectComments = (state) => state.comments.comments;
export const commentsLoading = (state) => state.comments.isLoading;
export const selectShowComments = (state) => state.comments.showComments;
export const selectId = (state) => state.comments.id

export default commentSlice.reducer;