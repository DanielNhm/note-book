const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  if (!books.length) return <h2 className="no-info-msg">No books to display</h2>
  return (
    <ul className="book-list flex justify-center">
      {books.map((book) => {
        return (
          <div className='card flex column'>

            <li key={book.id}>
              <BookPreview book={book} />
            </li>
            <section className='card-btn flex'>
              <button data-social='Details'>
                <Link to={`/book/index/${book.id}`}><i class="fa fa-info-circle" aria-hidden="true"></i>
                </Link>
              </button>
              <button data-social='Edit'>
                <Link to={`/book/index/edit/${book.id}`}><i class="fas fa-edit"></i></Link>
              </button>
              <button data-social='Delete' onClick={() => onRemoveBook(book.id)}><i class="fa fa-trash" aria-hidden="true"></i>

              </button>
            </section>
          </div>
        )
      })}
    </ul>
  )
}
