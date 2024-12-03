import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'

export function DynamicComponent({ note, editable, onTextChange,onEditTask }) {

    switch (note.type) {
        case 'NoteImg':
            return <NoteImg title={note.info.title} url={note.info.url} editable={editable} onTextChange={onTextChange}/>
        case 'NoteTodos':
            return <NoteTodos title={note.info.title} todos={note.info.todos} id={note.id}  editable={editable} onTextChange={onTextChange} onEditTask={onEditTask} />
        case 'NoteVideo':
            return <NoteVideo title={note.info.title} youtubeUrl={note.info.url} editable={editable} onTextChange={onTextChange} />
        case 'NoteTxt':
            return <NoteTxt txt={note.info.txt} editable={editable} onTextChange={onTextChange}/>
        case 'NoteCanvas':
            return <NoteCanvas note={note}/>
    }
}