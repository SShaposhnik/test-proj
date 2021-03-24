import React from 'react'
import VideosGrid from '../../components/VideosGrid/VideosGrid'

const Favorites = props => {
console.log(props);
  return (
    <div className='page--favorites'>
      Favorites
      <VideosGrid/>
    </div>
  )
}

export default Favorites