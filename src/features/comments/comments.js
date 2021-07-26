import React from 'react';
import { DateTime } from "luxon";

function Comments(props) {

    const { comments } = props;

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