
export function BookAddList({ books, onAddBook }) {
  return (
    <ul className="book-add-list">
      {books.map((book) => (
        <li key={book.id}>
          <p>{book.volumeInfo.title}</p>
          <button data-social='Add book' onClick={() => onAddBook(book)}>
            <i className="fa fa-plus-square-o" aria-hidden="true"></i> 
          </button>
        </li>
      ))}
    </ul>
  )
}

