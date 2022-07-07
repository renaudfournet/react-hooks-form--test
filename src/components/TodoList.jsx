import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export function TodoList() {
  const [data, setData] = useState('')
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    axios
      .post('http://localhost:8080/posts', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://localhost:8080/posts')
        setData(response)
        console.log(response)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [])

  if (!data) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-32">
        <div class="p-4 mx-72 bg-primary-100 rounded-lg border">
          <div class="flex justify-center items-center mb-4">
            <h5 class=" text-xl font-bold text-secondary-100 border-b border-secondary-100">
              There is 3 comments
            </h5>
          </div>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <input
                name="title"
                {...register('title')}
                id="title"
                type="text"
                class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <textarea
                name="description"
                id="description"
                {...register('description')}
                class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                rows="3"
                placeholder="Your todo"
              ></textarea>
              <button
                onSubmit={handleSubmit(onSubmit)}
                class="mt-5 bg-blue-500 hover:bg-blue-700 text-white-secondary font-bold py-2 px-4 rounded tracking-widest"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
          <div class="flow-root overflow-auto h-32">
            {data.map((item, index) => (
              <ul key={index} class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-white-100 truncate ">{item.title}</p>
                      <p class="text-sm text-white-100 truncate ">{item.description}</p>
                    </div>
                  </div>
                </li>
                <hr />
              </ul>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
