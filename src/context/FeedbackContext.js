import { createContext, useState } from 'react'
import {v4 as uuidv4} from "uuid"
const FeedbackContext =  createContext()

export const FeedbackProvider = ({children}) => {

    const [feedback,setfeedback] = useState([
        {
            id:1,
            text: 'This is feedback item 1',
            rating: 5
        },
        {
            id:2,
            text: 'This is feedback item 2',
            rating: 7
        },
        {
            id:3,
            text: 'This is feedback item 3',
            rating: 8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const deleteFeedback = (id)=>{
        if(window.confirm('Are you sure you want to delete?')){
            setfeedback(feedback.filter((item)=> item.id!== id ))
        }
    }

    //set item to be updated
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const addFeedback = (newFeedBack) => {
        newFeedBack.id = uuidv4()
        setfeedback([newFeedBack,...feedback])
    }
    

    const updateFeedback = (id,updatedItem)=> {
        setfeedback(feedback.map((item)=> item.id === id ? { ...item, ...updatedItem } : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext