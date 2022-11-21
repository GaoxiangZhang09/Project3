import React from 'react'

export default function HomeMintResultItem(props) {
  // console.log()
  return (
    <li>
      <h2>Number: <span>{props.number}</span></h2>
      <h2>MintDate: <span>{props.mintDate}</span></h2>
        <button className='btn btn-danger' style={{display:'none'}}>Delete</button>
    </li>
  )
}
