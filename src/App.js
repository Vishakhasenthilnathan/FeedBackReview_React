import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from "./data/FeedbackData"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import {v4 as uuidv4} from "uuid"

function App(){

    const [Feedback, setFeedback] = useState(FeedbackData)
    const addFeedback = (newFeedBack) => {
        newFeedBack.id = uuidv4()
        setFeedback([newFeedBack,...Feedback])
    }

    const deleteFeedback = (id)=>{
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(Feedback.filter((item)=> item.id!== id ))
        }
    }

    return (
        <>
            <Header/>
            <div className="container">
                <FeedbackForm handleAdd = {addFeedback}></FeedbackForm>
                <FeedbackStats feedback={Feedback}/>
                <FeedbackList feedback={Feedback}
                    handleDelete = {deleteFeedback}
                />
            </div>
        </>
    )
}

export default App