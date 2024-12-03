export function NoteCanvas({ note }) {
    const { url, title } = note.info

    console.log(note.info)

    return (
        <div className="note-canvas">
            {title && <h3>{title}</h3>}
            <img src={url} alt="Canvas Drawing" style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
        </div>
    )
}