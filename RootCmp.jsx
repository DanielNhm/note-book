const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { NoteDetails } from "./apps/note/cmps/NoteDetails.jsx"
import { NoteEdit } from "./apps/note/cmps/NoteEdit.jsx"



import { MissBooksApp } from './apps/missbooks/views/MissBooksApp.jsx'
import { BookIndex } from './apps/missbooks/views/BookIndex.jsx'
import { BookDetails } from './apps/missbooks/views/BookDetails.jsx'
import { EditBook } from './apps/missbooks/views/EditBook.jsx'
import { BookAdd } from './apps/missbooks/views/BookAdd.jsx'


import { UserMsg } from "./cmps/UserMsg.jsx"



export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />


                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/:noteId" element={<NoteDetails />} />
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>

                <Route path="/book" element={<MissBooksApp />}>
                    <Route index element={<Navigate to="/book/index" />} />
                    <Route path="/book/index" element={<BookIndex />} />
                    <Route path="/book/index/:bookId" element={<BookDetails />} />
                    <Route path="/book/index/edit/:bookId" element={<EditBook />} />
                    <Route path="/book/index/edit" element={<EditBook />} />
                    <Route path="/book/book-add" element={<BookAdd />} />
                </Route>

            </Routes>
            <UserMsg />
        </section>
    </Router>
}
