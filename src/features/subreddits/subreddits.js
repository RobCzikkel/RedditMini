import React from 'react';
import { useSelector } from 'react-redux';
import Subreddit from '../../components/Subreddit';
import { selectSubs } from './subredditSlice'

function Subreddits(props) {

    const subs = useSelector(selectSubs)
    const subSliced = subs.slice(0,15)

    return (
        <div className="sublist">
            <ul>
                {subSliced.map((sub, index) => <Subreddit key={index} sub={sub}/>)}
                
                
            </ul>
        </div>
    )
}

export default Subreddits;