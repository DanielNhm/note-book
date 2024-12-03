const { useEffect, useState } = React

export function NoteFilter({ onSetFilterBy }) {
    const [filterByType, setFilterByType] = useState('')
    const [activeButton, setActiveButton] = useState('Home') 

    useEffect(() => {
        onSetFilterBy(filterByType)

    }, [filterByType])

    function handleChange(type) {
        setFilterByType({ type })
        setActiveButton(type) 
    }

    return (
        <div className='sidebar'>
            <section className="note-filter">
                <button
                    onClick={() => handleChange('Home')}
                    className= {`${activeButton === 'Home' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>Home</span>
                </button>
                <button
                    onClick={() => handleChange('NoteImg')}
                    className= {`${activeButton === 'NoteImg' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className="fa-regular fa-image"></i>
                    <span>Image</span>
                </button>
                <button
                    onClick={() => handleChange('NoteCanvas')}
                    className= {`${activeButton === 'NoteCanvas' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className="fa fa-paint-brush" aria-hidden="true"></i>
                    <span>Canvas</span>
                </button>
                <button
                    onClick={() => handleChange('NoteTodos')}
                    className={`${activeButton === 'NoteTodos' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className='fa-solid fa-list'></i>
                    <span>Check list</span>
                </button>
                <button
                    onClick={() => handleChange('NoteTxt')}
                    className={`${activeButton === 'NoteTxt' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    <span>Text</span>
                </button>
                <button
                    onClick={() => handleChange('NoteVideo')}
                    className={`${activeButton === 'NoteVideo' ? 'active' : ''}  remove-tooltip`}
                >
                    <i className="fa fa-youtube" aria-hidden="true"></i>
                    <span>Video</span>
                </button>
            </section>
        </div>
    )
}
