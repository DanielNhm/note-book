// import { utilService } from '../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

var gFilterBy = { txt: '', minSpeed: 0 }

const gNotes = [
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "assets/img/ds.jpg",
            title: 'Nice place'
        },
        style: {
            backgroundColor: '#f3f3f3'
        }
    },
    {
        id: 'n104',
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: "assets/img/Alaska.jpg",
            title: 'Alaska'
        },
        style: {
            backgroundColor: '#f3f3f3'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: 'white'
        }
    },

    {
        id: "pSych",
        info: {
            title:
                "amazing",
            url:
                "data:image/png;base64,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"
        },
        isPinned: false,
        style: { backgroundColor: "lightBlue" },
        type: "NoteCanvas"
    },
    {
        id
            :
            "PwC0x",
        info
            :
        {
            title
                :
                "funny pic",
            url
                : 'assets/img/450477758_465920039548811_545511456595545288_n.jpg'
        }
        ,

        isPinned
            :
            true,
        style
            :
            { backgroundColor: "lavender" },
        type
            :
            "NoteImg"
    }, {

        id: "YG1XW",
        info: { url: "https://www.youtube.com/watch?v=YklszBMIEcc", title: "some music" },
        isPinned: true,
        style: { backgroundColor: "green" },
        type: "NoteVideo"
    }

    ,
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: 'silver',
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: "LpXyE",
        info: {
            txt: "My village is situated in a hilly region of Uttranchal. It is a small village surrounded by green forest. Here environment is calm and pollution free. A stream of water flows near my village, People are simple and their livelihood is agriculture, horticulture and cattle rearing. This place is far from hustle bustle of the city. People lead simple but happy life."
        },

        isPinned
            :
            false,
        style
            :
            { backgroundColor: "purple" },
        type
            :
            "NoteTxt"
    }

]


_createNotes()




export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    toggleTodoChecked,
    getEmptyTodo,
    addNote,
    duplicateNote,
    getDefaultFilterBY
}
window.noteService = noteService

function query(filterBy) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            let filteredNotes = notes
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                filteredNotes = notes.filter(note => {
                    console.log('f', filterBy.type)
                    if (filterBy.type && filterBy.type !== 'Home') {
                        return (
                            (note.type === filterBy.type && note.info.txt && regex.test(note.info.txt)) ||
                            (note.type === filterBy.type && note.info.title && regex.test(note.info.title)) ||
                            (note.type === filterBy.type && note.info.todos && note.info.todos.some(todo => regex.test(todo.txt)))

                        )
                    }
                    else {

                        return (
                            (note.info.txt && regex.test(note.info.txt)) ||
                            (note.info.title && regex.test(note.info.title)) ||
                            (note.info.todos && note.info.todos.some(todo => regex.test(todo.txt)))

                        )
                    }
                })
            }
            else if (filterBy.type && filterBy.type !== 'Home') {

                filteredNotes = notes.filter(note => note.type === filterBy.type)
            }

            return filteredNotes
        })
}


function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)


}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}
function getDefaultFilterBY() {
    return { txt: '' }
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function addNote(noteToAdd) {
    var note = getEmptyNote()
    note.type = noteToAdd.type


    if (noteToAdd.type === 'NoteImg' || noteToAdd.type === 'NoteVideo' || noteToAdd.type === 'NoteCanvas') {
        note.info = { url: noteToAdd.content.content, title: noteToAdd.content.title }
    } else if (noteToAdd.type === 'NoteTodos') {
        note.info = { title: noteToAdd.content.title, todos: noteToAdd.content.todos }
    } else {
        note.info = { txt: noteToAdd.content.txt }
    }

    return save(note)
}



function getEmptyNote() {
    return {

        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            txt: ''
        }

    }
}
function getEmptyTodo() {
    return {
        txt: '',
        doneAt: null
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        storageService.saveToStorage(NOTE_KEY, gNotes)
    }
}




function toggleTodoChecked(noteId, todoIndex) {
    return asyncStorageService.get(NOTE_KEY, noteId).then(note => {
        if (!note) return Promise.reject('Note not found')

        if (note.type !== 'NoteTodos') return Promise.reject('Note is not of type NoteTodos')

        const todo = note.info.todos[todoIndex]

        if (todo.doneAt) {
            todo.doneAt = null
        } else {
            todo.doneAt = Date.now()
        }

        return asyncStorageService.put(NOTE_KEY, note)
    })
}

function duplicateNote(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId).then(note => {
        const noteCopy = JSON.parse(JSON.stringify(note))
        delete noteCopy.id
        return asyncStorageService.post(NOTE_KEY, noteCopy)
    })
}







// function _setNextPrevnoteId(note) {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             const noteIdx = notes.findIndex(currnote => currnote.id === note.id)
//             note.nextnoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
//             note.prevnoteId =notes[noteIdx - 1]
//                 ? notes[noteIdx - 1].id
//                 : notes[notes.length - 1].id
//             return note
//         })
// }
