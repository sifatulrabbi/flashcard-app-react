import React, { useState } from 'react'
import FlashcardList from './FlashcardList'
import Form from './Form'
import './App.css'

function App() {
  const [flashQuizes, setFlashQuizes] = useState([])

  function buildFlashQuizes(data) {
    return data.map((questionItem, index) => {
      const answer = decodeStrings(questionItem.correct_answer)
      const options = [
        ...questionItem.incorrect_answers.map((str) => decodeStrings(str)),
        answer,
      ]
      return {
        id: `${index} + ${Date.now()}`,
        question: decodeStrings(questionItem.question),
        answer: answer,
        options: options.sort(() => Math.random() - 0.5),
      }
    })
  }

  function decodeStrings(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <>
      <Form
        buildFlashQuizes={buildFlashQuizes}
        setFlashQuizes={setFlashQuizes}
      />
      <div className='container'>
        <FlashcardList quizes={flashQuizes} />
      </div>
    </>
  )
}
export default App
