import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Form() {
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
  }

  return (
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select name='category' id='category' ref={categoryEl}>
          {categories.map((category) => {
            return (
              <option id={category.id} key={category.id}>
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
        <button className='btn'>Genarate</button>
      </div>
    </form>
  )
}

export default Form
