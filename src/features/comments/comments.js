import React from 'react';
import { DateTime } from "luxon";
import Skeleton from '@material-ui/lab/Skeleton';
import { commentsLoading } from './commentSlice'
import { useSelector } from 'react-redux';

function Comments(props) {

    const { comments } = props;
    const isLoading = useSelector(commentsLoading)

    if (isLoading) {
        return (
            <>
            {Array(5).fill(
                <div className="comment">
                    <Skeleton amination="wave" variant="text" height={50}/>
                </div>
            )}
            
            </>

        )
    }

    if (comments) {
        return (
            <>
            {comments.map(comment => 
                <div key={comment.id} className="comment">
                <div className="deets">
                    <h6>{comment.author}</h6>
                    <small>{comment.created ? DateTime.fromSeconds(comment.created).toFormat('HH:mm ccc') : comment.created}</small>
                </div>
                <div className="comment-body">
                    {comment.body}
                </div>
            </div> )}
            </>
        )
    }

    return (
        <>
        </>
    )

    
}

export default Comments;