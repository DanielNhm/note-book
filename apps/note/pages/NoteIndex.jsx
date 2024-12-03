const { useEffect, useState } = React
const { Outlet, NavLink, useLocation } = ReactRouterDOM



import { noteService } from '../services/note.service.js'
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'



export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilterBY())



    useEffect(() => {
        loadNotes()
        const unsubscribe = [
            eventBusService.on('load-notes', loadNotes),
            eventBusService.on('remove-note', onRemoveNote),
            eventBusService.on('pinned-note', onPinnedNote),
            eventBusService.on('update-note', onUpdateNote),
            eventBusService.on('duplicate-note', onDuplicateNote),
            eventBusService.on('set-filter', onAddFilter)

        ]

        return () => unsubscribe.forEach(unsub => unsub())
    }, [filterBy])

    function onAddFilter(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote).then(() => {
            const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note)
            setNotes(updatedNotes)
            loadNotes()
        })
    }
    function onSetFilterBy(filterBy) {
        console.log(filterBy)
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updateNotes = notes.filter(note => note.id != noteId)
            setNotes(updateNotes)
            showSuccessMsg(`Note ${noteId} removed`)
            loadNotes()

        }).catch(() => {
            showErrorMsg('Operation failed')
        })
    }

    function onPinnedNote(noteId) {
        var noteToEdit
        noteService.get(noteId).then((note) => {
            noteToEdit = note
            noteToEdit.isPinned = !note.isPinned
            onUpdateNote(noteToEdit)
        })

    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId).then(loadNotes)
    }

    function loadNotes() {
        noteService.query(filterBy).then(notes => {
            setNotes(notes)
        }).catch(err => console.error('Failed to load notes:', err))
    }

    function onAddNote(noteToAdd) {
        noteService.addNote(noteToAdd).then(() => {
            loadNotes()
            showSuccessMsg('Notepad added successfully!')
        }).catch(err=>console.error('Failed to add note:', err))

    }
    return <section className='note-index main-layout'>

        <section className='flex column'>

            <NoteFilter onSetFilterBy={onSetFilterBy} />
            <NoteAdd onAddNote={onAddNote} />

            <NoteList notes={notes} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} onDuplicateNote={onDuplicateNote} onPinnedNote={onPinnedNote} filterBy={filterBy} />
        </section>

        <section>
            <Outlet />
        </section>
    </section>
}
