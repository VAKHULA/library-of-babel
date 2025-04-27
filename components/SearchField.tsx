'use client'
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/navigation'
import { useState } from 'react';


export const SearchField = ({ initialValue = '', description }) => {
  const router = useRouter()
  const [search, setSearch] = useState(initialValue)

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      router.push(`/search/?search=${encodeURIComponent(search)}`)
    } else {
      router.push(`/`)
    }
  }

  return (
    <article className='container search-field'>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
        name="search"
        placeholder="Search"
        minRows={1}
        value={search}
        onChange={(e)=>{
          function removeChars(validChars, inputString) {
            var regex = new RegExp('[^' + validChars + ']', 'g');
            return inputString.replace(regex, '');
        }
            setSearch(removeChars(`абвгґдеєжзиіїйклмнопрстуфхцчшщьюя ,.\n`,e.target.value.toLowerCase()))
        }}
        />
        <div className='search-field__buttons'>
          <p>
          {description}
          </p>
          <input type="submit" value="Search" />
        </div>
      </form>
    </article>
  )
}