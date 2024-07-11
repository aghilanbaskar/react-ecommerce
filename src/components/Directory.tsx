import React from 'react'
import shopMen from 'src/assets/shopMen.jpg'
import shopWomen from 'src/assets/shopWomen.jpg'
import 'src/scss/components/directory.scss'
const Directory = () => {
  return (
    <div className='directory'>
        <div style={{ backgroundImage: `url(${shopMen})` }} className='item'></div>
        <div style={{ backgroundImage: `url(${shopWomen})` }} className='item'></div>
    </div>
  )
}

export default Directory