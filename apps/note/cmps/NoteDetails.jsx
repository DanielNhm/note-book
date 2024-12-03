const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { DynamicComponent } from "./DynamicComponent.jsx"

export function NoteDetails() {
    const [note, setNote] = useState(null)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        noteService.get(params.noteId).then((note)=>{
            setNote(note)
            setIsModalOpen(true)

        }).catch(err => {
            console.log('Had issue in note details', err)
            navigate('/note')
        })
    }, [params.noteId, navigate])

    function closeModal(){
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
        navigate('/note')

    }

    if(!note)
        return <div>Loading... </div>
    


    return isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" style={note.style} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close remove-tooltip" onClick={closeModal}>
                    Close
                </button>
                <div className="note-details" style={note.style}>
                    <DynamicComponent note={note} />
                </div>
            </div>
        </div>)



}