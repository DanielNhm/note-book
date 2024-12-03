const { useRef, useEffect } = React

export function Canvas({ onSave }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let isDrawing = false

        function startDrawing(event) {
            isDrawing = true
            const { offsetX, offsetY } = getMousePos(event)
            ctx.beginPath()
            ctx.moveTo(offsetX, offsetY)
        }

        function draw(event) {
            if (!isDrawing) return
            const { offsetX, offsetY } = getMousePos(event)
            ctx.lineTo(offsetX, offsetY)
            ctx.stroke()
        }

        function stopDrawing() {
            isDrawing = false
            ctx.beginPath()
        }

        function getMousePos(event) {
            const rect = canvas.getBoundingClientRect()
            return {
                offsetX: event.clientX - rect.left,
                offsetY: event.clientY - rect.top
            }
        }

        canvas.addEventListener('mousedown', startDrawing)
        canvas.addEventListener('mousemove', draw)
        canvas.addEventListener('mouseup', stopDrawing)
        canvas.addEventListener('mouseleave', stopDrawing)

        return () => {
            canvas.removeEventListener('mousedown', startDrawing)
            canvas.removeEventListener('mousemove', draw)
            canvas.removeEventListener('mouseup', stopDrawing)
            canvas.removeEventListener('mouseleave', stopDrawing)
        };
    }, []);

    function clearCanvas() {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function saveCanvas() {
        const dataUrl = canvasRef.current.toDataURL()
        onSave(dataUrl)
    }

    return (
        <div className="flex column">
            <canvas
                ref={canvasRef}
                width={500}
                height={200}
                style={{ border: '1px solid black', marginTop: '10px' }}
            ></canvas>
            <div>

            <button  className ='remove-tooltip' onClick={saveCanvas}>Save</button>
            <button className="remove-tooltip" onClick={clearCanvas} style={{ marginLeft: '10px' }}>Clear</button>
            </div>

        </div>
    )
}
