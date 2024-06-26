import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import URL from '../config/URL.js'

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher_year, setPublisher_year] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${URL}/books/${id}`)
      .then((response) => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublisher_year(response.data.publisher_year)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('An error occured, Please check console')
        console.log(error)
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publisher_year,
    }
    setLoading(true)
      axios
        .put(`${URL}/books/${id}`, data)
        .then(() => {
          setLoading(false)
          enqueueSnackbar('Book edited successfully', { variant: 'success' })
          navigate('/')
        })
        .catch((error) => {
          setLoading(false)
          // alert('An error occured, Please check console')
          enqueueSnackbar('Error', { variant: 'error' })
          console.log(error)
        })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Edit Book</h1>
      {
        loading
        ? (
          <Spinner />
        )
        : (
          ''
        )
      }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publisher Year</label>
          <input 
            type='text'
            value={publisher_year}
            onChange={(e) => setPublisher_year(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-300 m-8'
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook