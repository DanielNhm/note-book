const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { DynamicComponent } from "./DynamicComponent.jsx"
import { eventBusService } from '../../../services/event-bus.service.js'
import { ColorPicker } from './ColorPicker.jsx'



export function NoteEdit() {
    const [note, setNote] = useState(null)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isColorPicker, setIsColorPicker] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        noteService.get(params.noteId).then((note) => {
            setNote(note)
            setIsModalOpen(true)

        }).catch(err => {
            console.log('Had issue in note edit', err)
            navigate('/note')
        })
    }, [params.noteId, navigate])

    function closeModal() {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
        navigate('/note')

    }
    function toggleColorPicker() {
        setIsColorPicker(prevValue => !prevValue)
    }
    function onEditTask(idx, value) {
        const updateTodos = [...note.info.todos]
        updateTodos[idx] = { ...updateTodos[idx], txt: value }
        const updateNote = { ...note, info: { ...note.info, todos: updateTodos } }
        setNote(updateNote)
        eventBusService.emit('update-note', updateNote)


    }
    function handleColorChange(newColor) {
        const updateNote = { ...note, style: { ...note.style, backgroundColor: newColor } }
        eventBusService.emit('update-note', updateNote)
        setNote(updateNote)
    }
    function handleTextChange(field, value) {
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        saveNote()

    }
    function saveNote() {
        eventBusService.emit('update-note', note)
    }


    if (!note)
        return <div>Loading... </div>



    return isModalOpen && (
        <div className="note-edit modal-overlay flex" onClick={closeModal}>
            <div className="modal-content" style={note.style} onClick={(e) => e.stopPropagation()}>
                <div className="note-details" style={note.style}>
                    <DynamicComponent note={note}
                        editable={true}
                        onTextChange={handleTextChange}
                        onSave={saveNote}
                        onEditTask={onEditTask} />
                </div>
                <button data-social='Delete' onClick={(ev) => {
                    eventBusService.emit('remove-note', params.noteId)
                    closeModal()
                }}><i className="fa-regular fa-trash-can"></i>

                </button>

                <button data-social='Color' onClick={(ev) => {
                    ev.preventDefault()
                    toggleColorPicker()
                }}>
                    <i className="fa-solid fa-palette"></i>

                </button>
                <button data-social='Duplicate' onClick={(ev) => {
                    eventBusService.emit('duplicate-note', params.noteId)
                }}><i className="fa-regular fa-copy"></i>

                </button>

                {isColorPicker && <ColorPicker noteId={params.noteId} onColorChange={handleColorChange} />}
                <button className="modal-close remove-tooltip" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>)



}