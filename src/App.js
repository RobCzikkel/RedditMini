import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSub, fetchSubreddit } from './features/redditHome/redditSlice';
import Posts from './features/redditHome/redditList.js';
import Subreddits from './features/subreddits/subreddits'
import { fetchSubs } from './features/subreddits/subredditSlice';
import SearchField from './features/search/searchBox'

function App() {

    const dispatch = useDispatch();
    const sub = useSelector(selectCurrentSub);
    

    useEffect(() => {
        dispatch(fetchSubreddit(sub))
        dispatch(fetchSubs())
    }, [sub, dispatch]);


    return (
        <main>
            <SearchField />
            <section className="content">
                <Posts sub={sub}/>
                <div className="subs">
                    <h1>SubReddits</h1>
                    <Subreddits />
                </div>
            </section>
        </main>
    )
}

export default App;

