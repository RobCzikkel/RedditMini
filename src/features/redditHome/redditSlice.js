import { createSlice } from '@reduxjs/toolkit';


export const fetchSubreddit = (sub) => async (dispatch) => {
        try {
            dispatch(startLoad())
            const response = await fetch(`https://www.reddit.com/${sub}.json`);
            const data = await response.json();
            const posts = data.data.children.map(post => post.data)
            const postsPlus = posts.map(post => ({
                ...post,
                visible: false
            }))

            dispatch(loadPosts(postsPlus))
            
        } catch(err) {
            dispatch(setFailed());
        }
        
        
    }


export const redditSlice = createSlice({
    name:'reddit',
    initialState: {
        posts: [],
        currentSub: 'r/popular',
        isLoading: false,
        isFailed: false,
    },
    reducers: {
        loadPosts(state, action) {
            state.posts = action.payload;
            state.isLoading = false
        },
        setSub(state, action) {
            state.currentSub = action.payload
        },
        setFailed(state, action) {
            state.isLoading = 'true'
        },
        startLoad(state, action) {
            state.isLoading = true
        },
        setVisible(state, action) {

            state.posts[action.payload].visible = !state.posts[action.payload].visible
        },
        setHidden(state,action) {
            state.posts[action.payload].visible = false
        },
        upVote(state, action) {
            state.posts[action.payload.index].score += action.payload.value
        },
        downVote(state, action) {
            state.posts[action.payload.index].score -= action.payload.value
        }
    }
}
)

export const { loadPosts, setFailed, setSub, startLoad, setVisible, setHidden, upVote, downVote } = redditSlice.actions;

export const selectPosts = (state) => state.reddit.posts;
export const selectCurrentSub = (state) => state.reddit.currentSub;
export const selectFailed = (state) => state.reddit.isFailed;
export const selectLoading = (state) => state.reddit.isLoading;

export default redditSlice.reducer;