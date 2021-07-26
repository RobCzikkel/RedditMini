import { createSlice } from "@reduxjs/toolkit";



export const fetchSubs = () => async(dispatch) => {
    try {
        dispatch(loadStarted())
        const response = await fetch('https://www.reddit.com/subreddits.json')
        const data = await response.json()
        const subs = data.data.children.map(sub => sub.data)
        dispatch(loadSubs(subs))
    } catch(err) {
        dispatch(setFailedSub())
    }
}


const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subs: [],
        isLoading: false,
        hasFailed: false
    },
    reducers: {
        loadStarted(state,action) {
            state.isLoading = true
        },
        loadSubs(state,action) {
            state.subs = action.payload
            state.isLoading = false
        },
        setFailedSub(state,action) {
            state.hasFailed = true
        }
    }
})

export const { loadStarted, loadSubs, setFailedSub } = subredditSlice.actions

export const selectSubs = (state) => state.subreddit.subs


export default subredditSlice.reducer