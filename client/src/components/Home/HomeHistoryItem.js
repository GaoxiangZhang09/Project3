import React from 'react'

export default function HomeMintResultItem(props) {
  // console.log(props.thisHistory)
  const history = props.thisHistory
  const deleteMintById = props.deleteMintById 
  const updateMintNameById = props.updateMintNameById
  return (
    <li>
      <h3>Name: <span>{history.name}</span></h3>
      <h3>Number: <span>{history.number}</span></h3>
      <h3>MintDate: <span>{history.date}</span></h3>
        <button className='btn btn-info' onClick={()=>updateMintNameById(history._id)} >Update Name</button>
        <button className='btn btn-danger' onClick={()=>deleteMintById(history._id)} >Delete</button>
    </li>
  )
}
