const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'





export function NoteTodos({ title, todos, id, editable, onTextChange, onEditTask }) {
    const [todosToEdit, setTodosToEdit] = useState(todos)


    useEffect(() => {
        setTodosToEdit(todos)
    }, [todos])

    function handleCheckboxChange(idx) {
        const updatedTodos = [...todosToEdit]

        if (updatedTodos[idx].doneAt) {
            updatedTodos[idx].doneAt = null
        } else {
            updatedTodos[idx].doneAt = Date.now()
        }


        setTodosToEdit(updatedTodos)

        noteService.toggleTodoChecked(id, idx).then(() => {
            eventBusService.emit('load-notes')
        })
    }
    function handleChange(idx, value) {
        const updateTodos = [...todosToEdit]
        updateTodos[idx] = { ...updateTodos[idx], txt: value }
        setTodosToEdit(updateTodos)
        onEditTask(idx, value)
    }

    return (
        <React.Fragment>
            {editable ? (
                <div className="input-data" >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTextChange('title', e.target.value)}
                    onBlur={(e) => onTextChange('title', e.target.value)}
                    placeholder="Edit Title"
                />
                <div className="underline"></div>
                </div>


            ) : (
                <h1>{title}</h1>
            )}
            {editable ? (
                <form>
                    {todosToEdit.map((todo, idx) => (
                        <div className="input-data" key={idx}>
                            <input
                                type="text"
                                value={todo.txt}
                                onChange={(e) => handleChange(idx, e.target.value)}
                            />
                            <div className="underline"></div>
                        </div>
                    ))}
                </form>
            ) : (
                <form>
                    {todosToEdit.map((todo, idx) => (
                        <React.Fragment key={idx}>
                            <input
                                type="checkbox"
                                id={`todo-${id}-${idx}`}
                                name={`todo-${id}-${idx}`}
                                checked={!!todo.doneAt}
                                onChange={() => handleCheckboxChange(idx)}
                            />
                            <label htmlFor={`todo-${id}-${idx}`}>{todo.txt}</label>
                            <br />
                        </React.Fragment>
                    ))}
                </form>
            )}
        </React.Fragment>
    )
}
