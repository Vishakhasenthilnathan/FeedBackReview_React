import React from 'react'
import FeedbackItem from './FeedbackItem'
import {useContext} from 'react'
import FeedbackContext  from '../context/FeedbackContext'

function FeedbackList() {
const {feedback,isLoading} = useContext(FeedbackContext)

if(!feedback.length===0){
    return <p>No feedback yet!</p>
}
else{
    return  (<div className="feedback-list">
        {
            feedback.map((item)=>(<div>
               <FeedbackItem 
                    key = {item.id} 
                    item={item} 
                />
            </div>))
        }
    </div>)
}

}
  
export default FeedbackList