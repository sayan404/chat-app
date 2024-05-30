import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState("")
  const [responseText, setResponseText] = useState("")
  const [loading, setLoading] = useState(false)
  // console.log(inputText);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB4DolawuSc0QEhkiKTh3XVPOkRu3RrIhw`
    try {
      setLoading(true)
      const response = await axios.post(url, {
        "contents": [{ "parts": [{ "text": inputText }] }],
      })
      //  console.log(response.data.candidates[0].content.parts[0].text);
      setResponseText(response.data.candidates[0].content.parts[0].text)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data.error.message);
      setLoading(false)
      setResponseText(error.response.data.error.message)
    }
  }
  return (
    <>
      <div className='parent-component'>
        <div className='header-component'>Chat App Using Gemini API</div>
        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className='chat-box' placeholder='Ask anything here...'></textarea>
          <button type='submit'>Submit</button>
        </form>
        {
          loading ? <div>
            Loading...
          </div> : <pre>{responseText}</pre>
        }
      </div>
    </>
  )
}

export default App
