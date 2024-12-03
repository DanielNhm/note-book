const { Link, useParams, useNavigate } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'



export function NoteList({ notes, onRemoveNote, onUpdateNote, onDuplicateNote,onPinnedNote,filterBy }) {

    const pinnedNotes = notes.filter((note) => note.isPinned)
    const unPinnedNotes = notes.filter((note) => !note.isPinned)

    return (
        <div className='note-list align-center'>
            {(pinnedNotes.length > 0 && (!filterBy.type || filterBy.type === 'Home'))?
                (<div>

                    <h1 className='category-title'>Pinned notes:</h1>
                    <ul className=" clean-list">
                        {pinnedNotes.map((note) => (
                            <li style={note.style} key={note.id} className="note">
                                <Link to={`/note/${note.id}`}>
                                    <NotePreview
                                        note={note}
                                        onRemoveNote={onRemoveNote}
                                        onUpdateNote={onUpdateNote}
                                        onDuplicateNote={onDuplicateNote}
                                        onPinnedNote = {onPinnedNote}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                  {(unPinnedNotes.length > 0) && <React.Fragment>

                    <h1 className='category-title'>Other notes:</h1>
                    <ul className="clean-list">
                        {unPinnedNotes.map((note) => (
                            <li style={note.style} key={note.id} className="note">
                                <Link to={`/note/${note.id}`}>
                                    <NotePreview
                                        note={note}
                                        onRemoveNote={onRemoveNote}
                                        onUpdateNote={onUpdateNote}
                                        onDuplicateNote={onDuplicateNote}
                                        onPinnedNote = {onPinnedNote}

                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </React.Fragment>}
                </div>

                ) :
                (
                    <ul className="clean-list">
                        {notes.map((note) => (
                            <li style={note.style} key={note.id} className="note">
                                <Link to={`/note/${note.id}`}>
                                    <NotePreview
                                        note={note}
                                        onRemoveNote={onRemoveNote}
                                        onUpdateNote={onUpdateNote}
                                        onDuplicateNote={onDuplicateNote}
                                        onPinnedNote = {onPinnedNote}

                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) }
            
        </div>
    )
}