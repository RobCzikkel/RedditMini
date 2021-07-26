import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTerm } from './searchSlice'

function SearchField() {

    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        dispatch(setTerm(searchTerm))
    }, [searchTerm, dispatch])

    return (    
        <section className="search">
            <img src="logo.png" alt="logo"/>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search Content"/>
            <button>SEARCH</button>
        </section>
    )
}

export default SearchField;