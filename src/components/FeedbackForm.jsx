import { useState, useEffect } from 'react'
import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const [text,setText] = useState('')
    const [btnDisabled,setbtnDisabled] = useState(true)
    const [message,setMessage] = useState('')
    const [rating,setRating] = useState(10)

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(()=>{
        if(feedbackEdit.edit===true){
            setbtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])

    const handleTextChange = (e)=> {
        if(text === ''){
            setbtnDisabled(true)
            setMessage('')
        }
        else if(text.length <=10){
            setMessage('Text must be atleast 10 characters')
            setbtnDisabled(true)
        }
        else{
            setMessage('')
            setbtnDisabled(false)
        }
        setText(e.target.value)
    }
    const handleSubmit  = (e) => {
        e.preventDefault()
        if(text.length>10){
            const newFeedBack = {
            text,
            rating
            }
            if(feedbackEdit.edit===true){
                updateFeedback(feedbackEdit.item.id, newFeedBack )
            }
            else{
                addFeedback(newFeedBack)
            }
            
            setText('')
        }
    }

  return (
      <Card>
           <form onSubmit={handleSubmit}>
               <h2>How would you rate your service with us?</h2>
                <RatingSelect select = {setRating} selected={rating}></RatingSelect>
                <div className="input-group">
                    <input onChange={handleTextChange} type='text' placeholder='Write a review' value={text} />
                    <Button type='submit'isDisabled={btnDisabled} >Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
           </form>
      </Card>
  )
}

export default FeedbackForm