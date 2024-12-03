export function NoteVideo({ title, youtubeUrl, editable, onTextChange }) {
    const embedUrl = youtubeUrl.includes('watch?v=') 
        ? youtubeUrl.replace('watch?v=', 'embed/') 
        : youtubeUrl.includes('youtu.be/') 
        ? youtubeUrl.replace('youtu.be/', 'www.youtube.com/embed/') 
        : youtubeUrl

    return (
        <section className="note-video">
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
            ) : (
                <h1>{title}</h1>
            )}
            {youtubeUrl ? (
                <iframe
                    width="100%"
                    height="315"
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Invalid YouTube URL</p>
            )}
        </section>
    )
}
