import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Form() {
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      const categoriesArray = buildCategories(res.data.trivia_categories)
      setCategories(categoriesArray)
    })
  }, [])

  function buildCategories(data) {
    return data.map((category) => {
      return {
        id: category.id,
        name: category.name,
      }
    })
  }

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
              <option id={category.name} key={category.id}>
                {category.name}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}

export default Form
