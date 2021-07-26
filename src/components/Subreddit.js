import React from 'react';
import { useDispatch } from 'react-redux';
import { setSub } from '../features/redditHome/redditSlice'


function Subreddit(props) {

    const dispatch = useDispatch()
    const { sub } = props

    const handleClick = () => {
        dispatch(setSub(sub.display_name_prefixed))
    }

    return (

        <li onClick={handleClick}>
            <img src={sub.icon_img ? sub.icon_img : "logo.png"} alt="" />
            <h6>{sub.display_name_prefixed}</h6>
        </li>

    )
}

export default Subreddit;