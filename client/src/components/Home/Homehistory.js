import React from 'react'
import HomeHistoryItem from './HomeHistoryItem'
import {nanoid} from "nanoid"
import PropTypes from 'prop-types';

function Homehistory(props) {
  const historys = props.history
  return (
    <ul>
      {
        historys.map((thisHistory)=>{
            // console.log(history)
            // return <HomeHistoryItem key= {history.number} number={history.number} mintDate={history.mintDate} />
            // use 批量传递props 
          
            return(
              <HomeHistoryItem key= {nanoid()} thisHistory={thisHistory} {...props} />
              )
        })
      }
    </ul>
  )

}

Homehistory.propTypes = {
  thisHistory: PropTypes.object
};

export default Homehistory;