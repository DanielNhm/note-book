const { useRef, useState } = React

import { Canvas } from "./Canvas.jsx"


export function NoteAdd({ onAddNote }) {
    const [noteType, setNoteType] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [todos, setTodos] = useState([{ txt: '', doneAt: null }])

    const fileInputRef = useRef(null)




    function handleAddNote() {
        if (noteType === 'NoteTodos' && todos.length) {
            onAddNote({ type: noteType, content: { title: noteTitle, todos } })
        }
        else if (noteType === 'NoteTxt') {
            onAddNote({ type: noteType, content: { txt: noteContent } })


        } else if (noteContent) {
            onAddNote({ type: noteType, content: { title: noteTitle, content: noteContent } })
        }
        resetForm()
    }

    function resetForm() {
        setNoteContent('')
        setNoteTitle('')
        setImagePreview(null)
        setTodos([{ txt: '', doneAt: null }])
        setNoteType('')
    }
    function handleImageUpload(event) {
        const file = event.target.files[0]
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setImagePreview(fileUrl)
            const reader = new FileReader()
            reader.onloadend = () => {
                setNoteContent(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function handleAddTodo() {
        setTodos([...todos, { txt: '', doneAt: null }])
    }
    function handleSaveCanvas(dataUrl) {
        onAddNote({ type: 'NoteCanvas', content: { title: noteTitle, content: dataUrl } })
        resetForm()
    }



    return <section className="note-add flex justify-center column">
        <section className="flex align-center space-between">

            {!(noteType === 'NoteTxt') &&
                <input
                    type="text"
                    placeholder="Title..."
                    value={noteTitle}
                    onChange={(ev) => setNoteTitle(ev.target.value)}
                    onFocus={() => {
                        if (noteType)
                            return
                        setNoteType('NoteTxt')
                    }}
                />
            }
            {!noteType && (
                <section className="flex">
                    <button data-social="Image" onClick={() => {
                        setNoteType('NoteImg')
                        document.getElementById('upload').click()
                    }}>
                        <i  className="fa fa-file-image-o"></i>
                    </button>
                    <button data-social='Check list' onClick={() => { setNoteType('NoteTodos') }}>
                        <i className='fa-solid fa-list'></i>
                    </button>
                    <button data-social="Text" onClick={() => { setNoteType('NoteTxt') }}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>

                    </button>
                    
                </section>
            )}
        </section>
        {noteType === 'NoteTxt' && (
            <input
                type="text"
                placeholder="Enter your note..."
                value={noteContent}
                onChange={(ev) => setNoteContent(ev.target.value)}
            />
        )}
        {noteType === 'NoteImg' && (
            <div>

                <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
            </div>
        )}
        {noteType === 'NoteTodos' && (
            <div>
                {todos.map((todo, idx) => (
                    <input
                        key={idx}
                        type="text"
                        placeholder={`task ${idx + 1}`}
                        value={todo.txt}
                        onChange={(ev) => {
                            const newTodos = [...todos]
                            newTodos[idx].txt = ev.target.value
                            setTodos(newTodos)
                        }}
                    />
                ))}
                <button data-social='Add Task' onClick={handleAddTodo}><i className="fa fa-plus-square"></i>
                </button>
            </div>
        )}
        {noteType === 'NoteVideo' && (
            <div>
                <input
                    type="text"
                    placeholder="Enter youtube url..."
                    onChange={(ev) => setNoteContent(ev.target.value)}
                />
            </div>
        )}
        {noteType === 'NoteCanvas' && (
            <Canvas onSave={handleSaveCanvas} />
        )}
        {!!noteType &&


            <section className="flex align-center justify-end space-between">
                <section className='cls-btn '>

                    <button className="remove-tooltip" onClick={() => {
                        setNoteType('')
                    }}>Close</button>
                </section>
                <button data-social="Image" onClick={() => {
                    setNoteType('NoteImg')
                    fileInputRef.current.click()
                }}>
                    <i className="fa fa-file-image-o"></i>
                </button>
                <button data-social="Canvas" onClick={() => setNoteType('NoteCanvas')}>
                            <i className="fa fa-paint-brush" aria-hidden="true"></i>
                        </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <button data-social="Check list" onClick={() => { setNoteType('NoteTodos') }}><i className='fa-solid fa-list'></i>
                </button>
                <button data-social="Text" onClick={() => { setNoteType('NoteTxt') }}><i className="fa fa-pencil" aria-hidden="true"></i>

                </button>
                <button data-social='Video' onClick={() => { setNoteType('NoteVideo') }}><i className="fa fa-youtube" aria-hidden="true"></i>

                </button>
                <button data-social="Add note" onClick={handleAddNote}><i className="fa fa-plus-square-o" aria-hidden="true"></i>
                </button>
            </section>
        }
    </section>


}