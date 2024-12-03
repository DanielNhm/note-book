
export function BookPreview({book}) {
  return (
    <article className="book-preview">
        <h2>{book.title}</h2>
        <img className="book-img" src={book.thumbnail}/>
        <h4>
        {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: book.listPrice.currencyCode,
        }).format(book.listPrice.amount)}</h4>
    </article>
  )
}
