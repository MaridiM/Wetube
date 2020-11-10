import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { videosSearch as searchVideo } from 'store/actions'
import { videoSearch } from 'routes/routes'



const Search = ({ searchVideo }) => {
  const [query, setQuery] = useState('');
  
  const searchHandler = e => {
      const value = e.target.value
      return setQuery(value)
  }

  return (
    <form className="search" method="GET">
        <input 
          type="search" 
          className="search-input" 
          maxLength="256" 
          name="search" 
          onChange={(e) => searchHandler(e)}
          placeholder="Search…" 
          id="search" 
          required />
        <i className="fas fa-search search__img"></i>
        <Link to={videoSearch(query)}>
          <button 
            type="submit" 
            className="btn btn-search"
            onClick={() => searchVideo(query)}
            >Search</button>
        </Link>
    </form>
  )
}

const mapDispatchToProps = {
  searchVideo
}

export default connect(null, mapDispatchToProps)(Search)
