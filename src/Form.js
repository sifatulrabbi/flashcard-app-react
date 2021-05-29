import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Form({ setFlashQuizes, buildFlashQuizes }) {
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php?', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        const flashQuizes = buildFlashQuizes(res.data.results)
        setFlashQuizes(flashQuizes)
      })
  }

  return (
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select name='category' id='category' ref={categoryEl}>
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='amount'>Number Of Questions</label>
        <input
          type='number'
          id='amount'
          min='1'
          step='1'
          defaultValue={10}
          ref={amountEl}
        />
      </div>
      <div className='form-group'>
        <button className='btn' type='submit'>
          Genarate
        </button>
      </div>
    </form>
  )
}

export default Form
