export function NoteTxt({ txt, editable, onTextChange }) {
    function handleChange({ target }) {
        onTextChange('txt', target.value)
    }

    return editable ? (
        <div className="input-data" >

        <input
            type="text" value={txt} onBlur={handleChange} onChange={handleChange} />
            <div className="underline"></div>
            </div>
    ) : (
        <h1>{txt}</h1>
    )
}