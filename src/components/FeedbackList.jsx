import React from 'react'
import FeedbackItem from './FeedbackItem'
import {useContext} from 'react'
import FeedbackContext  from '../context/FeedbackContext'

function FeedbackList() {
const {feedback} = useContext(FeedbackContext)

  return <div className="feedback-list">
        {
            feedback.map((item)=>(<div>
               <FeedbackItem 
                    key = {item.id} 
                    item={item} 
                />
            </div>))
        }
    </div>
}

export default FeedbackList