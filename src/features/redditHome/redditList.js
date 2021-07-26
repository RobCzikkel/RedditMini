import React from 'react';
import {  useSelector } from 'react-redux';
import { selectPosts } from './redditSlice'
import Post from '../../components/Post'
import { selectComments, selectPermaLink, selectId } from '../comments/commentSlice';

function Posts(props) {

    const comments = useSelector(selectComments)
    const term = useSelector((state) => state.search.term)

    const link = useSelector(selectPermaLink);
    const id = useSelector(selectId);

    const selectedPosts = useSelector(selectPosts)
    
    const posts = selectedPosts.filter(post => post.title.toLowerCase().includes(term.toLowerCase()))
   

    return (

        <div className="stream">
            <h1>{props.sub}</h1>
            {posts.map((post, index) => <Post comments={comments[id]} postId={id} link={link} key={index} id={index} post={post} />)}
        </div>
            
    )
}

export default Posts;