import { createContext,useEffect, useState } from 'react'
const FeedbackContext =  createContext()

export const FeedbackProvider = ({children}) => {

    const [isLoading,setIsLoading] = useState(true)
    const [feedback,setfeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const deleteFeedback = async(id)=>{
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`,{method:'DELETE'})
            setfeedback(feedback.filter((item)=> item.id!== id ))
        }
    }

    //runs on launch, if array is empty
    useEffect(() => {
      fetchFeedback()
    }, [])
    
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)

        const data = await response.json()

        setfeedback(data)
        setIsLoading(false)
    }

    //set item to be updated
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const addFeedback = async (newFeedBack) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedBack)
        })

        const data = await response.json
        setfeedback([data,...feedback])
    }
    

    const updateFeedback = async(id,updatedItem)=> {
        const response = await fetch(`/feedback/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })

        const data = await response.json()
        setfeedback(feedback.map((item)=> item.id === id ? { ...item, ...data } : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        isLoading,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext