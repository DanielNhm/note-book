const { Link } = ReactRouterDOM

import { Loader } from '../../../pages/Loader.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { booksService } from '../services/books-service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    booksService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log('err:', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveBook(bookId) {
    booksService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => {
          return prevBooks.filter((book) => book.id !== bookId)
        })
        showSuccessMsg(`Book successfully removed! ${bookId}`)
      })
      .catch((err) => console.log('err:', err))
  }

  if (!books) return <Loader/>
  return (
    <section className='book-index main-layout full'>
      <div className="top-menu flex">
        <Link className='google-book' to="/book/book-add">Add from Google</Link>
        <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <Link className="add-book-btn" to="/book/index/edit">
          Add a Book
        </Link>
      </div>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
