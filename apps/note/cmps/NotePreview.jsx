const { useState } = React
const { Link } = ReactRouterDOM




import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'
import { ColorPicker } from './ColorPicker.jsx'



export function NotePreview({ note, onRemoveNote, onUpdateNote, onDuplicateNote, onPinnedNote }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { type, info, id } = note
    let content

    function toggleModal(ev) {
        ev.preventDefault()
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    }

    function handleColorChange(newColor) {
        const updateNote = { ...note, style: { ...note.style, backgroundColor: newColor } }
        onUpdateNote(updateNote)
    }



    if (type === 'NoteTxt') {
        content = <NoteTxt txt={info.txt} />
    }
    else if (type === 'NoteImg') {
        content = <NoteImg title={info.title} url={info.url} />
    }
    else if (type === 'NoteTodos') {
        content = <NoteTodos title={info.title} todos={info.todos} id={id} />
    }
    else if (type === 'NoteVideo') {
        content = <NoteVideo title={info.title} youtubeUrl={info.url} />
    }
    else if(type === 'NoteCanvas')
        content = <NoteCanvas note = {note} />


    return <article className="note-preview">
        {content}
        {/* <section className='button-section flex column'>

        </section> */}
        <section className='actions-container'>


            <span onClick={(ev) => {
                ev.preventDefault()
                onPinnedNote(note.id)
            }} className="pin material-symbols-outlined"  style={{
                fontVariationSettings: `${note.isPinned ? '"FILL" 1' : '"FILL" 0'}, "wght" 300, "GRAD" 0, "opsz" 24`,
            }}>
                keep
            </span>

            <button data-social='Delete' onClick={(ev) => {
                ev.preventDefault()
                onRemoveNote(note.id)
            }}><i className="fa-regular fa-trash-can"></i>

            </button>

            <button data-social='Color' onClick={(ev) => {
                ev.preventDefault()
                toggleModal(ev)
            }}>
                <i className="fa-solid fa-palette"></i>

            </button>
            <button data-social='Duplicate' onClick={(ev) => {
                ev.preventDefault()
                onDuplicateNote(note.id)
            }}><i className="fa-regular fa-copy"></i>

            </button>
            <Link to={`/note/edit/${note.id}`}>
                <button data-social='Edit'>
                    <i className="fas fa-edit"></i>
                </button>
            </Link>
        </section>
        {isModalOpen && <ColorPicker noteId={id} onColorChange={handleColorChange} />}


    </article >

}