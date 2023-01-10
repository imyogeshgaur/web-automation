import React from 'react'

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <>
            <button style={{ borderTopLeftRadius: "7px", borderBottomLeftRadius: "7px", border: "none" }}><i className='fas fa-search'></i></button>
            <input id="search" type="search" placeholder="Search" aria-label="Search" style={{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", backgroundColor: "#f0f0f0", border: "none" }} value={filter} onChange={(e) => setFilter(e.target.value)} />
        </>
    )
}

export default GlobalFilter