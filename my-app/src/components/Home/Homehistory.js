import React from 'react'
import HomeHistoryItem from './HomeHistoryItem'

export default function Homehistory(props) {
  const historys = props.history
  return (
    <ul>
      {
        historys.map((history)=>{
            // console.log(history)
            // return <HomeHistoryItem key= {history.number} number={history.number} mintDate={history.mintDate} />
            // use 批量传递props 
          
            return(
              <HomeHistoryItem key={history.number} {...history}/>
              )
        })
      }
    </ul>
  )
}
