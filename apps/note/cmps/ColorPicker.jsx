
export function ColorPicker({ noteId, onColorChange }) {
    const colors = ["lightPink",'#f3f3f3','white', "lightBlue", "lavender", "red", "blue", "green", "orange","purple","yellow"]


    return <section className="color-picker">
        <div className="colors-container flex align-center justify-center">
            {
                colors.map(color => <div  onClick= {(ev)=>{ 
                    ev.preventDefault()
                    onColorChange(color)} }className="color-item" key={color} style={{background:color}}></div>)
            }

        </div>
    </section>
}