import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, setPermaLink, setId } from '../features/comments/commentSlice';
import Comments from '../features/comments/comments';
import { setVisible, upVote, downVote } from '../features/redditHome/redditSlice'
import { DateTime } from "luxon";
import { setSub } from '../features/redditHome/redditSlice';


export default function Post(props) {

    const [voted, setVoted] = useState('')
    


    const { post } = props;
    const dispatch = useDispatch();
    const handleClick = (e) => {
        dispatch(fetchComments(e.target.dataset.id, e.target.dataset.link))
        dispatch(setId(e.target.dataset.id))
        dispatch(setPermaLink(e.target.dataset.link))
        dispatch(setVisible(props.id))
    }


    const increment = () => {
        if (voted === '') {
            dispatch(upVote({index: props.id, value: 1}))
            setVoted('upped')
        } 
        if (voted === 'downed') {
            dispatch(upVote({index: props.id, value: 2}))
            setVoted('upped')
        }
        if (voted === 'upped') {
            dispatch(upVote({index: props.id, value: -1}))
            setVoted('')
        }
    }

    const decrement = () => {
        if (voted === 'upped') {
            dispatch(downVote({index: props.id, value: 2}))
            setVoted('downed')
        } 
        if (voted === '') {
            dispatch(downVote({index: props.id, value: 1}))
            setVoted('downed')
        }

        if (voted === 'downed') {
            dispatch(downVote({index: props.id, value: -1}))
            setVoted('')
        }
    }
    
    const handleSub = () => {
        dispatch(setSub(post.subreddit_name_prefixed))
    }


    return (
        <article>
            <div className="top">
                <h3 onClick={handleSub} >{post.subreddit_name_prefixed}</h3>
                <small>{DateTime.fromSeconds(post.created).toFormat('HH:mm ccc')}</small>
                <div className="counter">
                    {voted === "upped" ? <i onClick={increment} id="up" className="material-icons upvoted">arrow_upward</i> : <i onClick={increment} id="up" className="material-icons">arrow_upward</i>}
                    <h4>{post.score}</h4>
                    {voted === "downed" ? <i onClick={decrement} id="down" className="material-icons downvoted">arrow_downward</i> : <i onClick={decrement} id="down" className="material-icons">arrow_downward</i>}
                </div>
            </div>
            <div className="mid">
                <p>{post.title}</p>
                <img src={post.thumbnail} alt=""/>
            </div>
            <div className="combined">
                <div className="bottom">
                    <h5><small>posted by</small> {post.author}</h5>
                    <div onClick={handleClick}  className="comments"><small>{post.num_comments}</small><i data-id={post.id} data-link={post.permalink} className="material-icons">chat</i></div>
                </div>
                {!post.visible || <Comments comments={props.comments} postId={props.postId} link={props.link}/>}
                
            </div>

        </article>
    )
}