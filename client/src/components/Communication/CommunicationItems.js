import React, { useState } from 'react'

export default function CommunicationItems(props) {
  const items = props.item
  console.log(items, items[0])
  if(items.length > 1){
    return (
      <div>
        {
          items.map((item)=>{
              // return <HomeHistoryItem key= {history.number} number={history.number} mintDate={history.mintDate} />
              // use 批量传递props 
              return <h1>Someone says:" {item}"</h1>
          })
        }
      </div>
    )
  }
}

