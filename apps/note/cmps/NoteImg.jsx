export function NoteImg({url, title, editable, onTextChange}){
    return <section className="note-img">
            {editable ? (
                   <div className="input-data">

                   <input
                       type="text"
                       value={title}
                       onChange={(e) => onTextChange('title', e.target.value)}
                       onBlur={(e) => onTextChange('title', e.target.value)}
                       placeholder="Edit Title"
                   />
                   <div className="underline"></div>
               </div>
                ):(

                        <h1>{title}</h1>
                    )}

        <img src={`${url}`}></img>
    </section>
}