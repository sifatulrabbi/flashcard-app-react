import React, { useState, useEffect, useRef } from 'react'

function Flashcard({ quiz }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  useEffect(setMaxHeight, [quiz.question, quiz.answer, quiz.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    const maxHeight = Math.max(frontHeight, backHeight, 120)
    setHeight(maxHeight)
  }

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}>
      <div className='front' ref={frontEl}>
        <div>{quiz.question}</div>
        <div className='flashcard-options'>
          {quiz.options.map((option) => {
            return (
              <div className='flashcard-option' key={option}>
                {option}
              </div>
            )
          })}
        </div>
      </div>
      <div className='back' ref={backEl}>
        {quiz.answer}
      </div>
    </div>
  )
}

export default Flashcard
