const { useState, useEffect } = React

export function BooksFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function onSetFilterBy(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { txt, maxPrice, maxPageCount } = filterByToEdit
  return (
    <section className="books-filter">

      <form onSubmit={onSetFilterBy}>
        <div className="search">
          <span class="search-icon material-symbols-outlined">
            search
          </span>
          <input className="search-input" onChange={handleChange} value={txt} type="search" name="txt" id='txt' placeholder="Search a book..." />

        </div>


      </form>
    </section>
  )
}
