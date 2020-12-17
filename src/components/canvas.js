import React, {useRef, useEffect, useState} from "react"
import Eraser from "../icons/eraser.png"
import BrushBig from "../icons/brush-big.png"
import BrushSmall from "../icons/brush-small.png"

const Canvas = ({socket, myTurn}) => {
	const [drawing, setDrawing] = useState(false)
	const [brush, setBrush] = useState({thickness: 5, color: "#000000"})
	const [erasing, setErasing] = useState(false)
	const canvasRef = useRef()
	const contextRef = useRef()

	const clearCanvas = (ctx, width, height) => {
		ctx.clearRect(0, 0, width, height)
	}

	const handleClearCanvas = () => {
		if(!myTurn) {
			return null
		}
		const ctx = contextRef.current
		const width = canvasRef.current.width
		const height = canvasRef.current.height

		clearCanvas(ctx, width, height)
		socket.emit("clear")
	}
	
	const draw = (ctx, y, x) => {
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const handleDraw = (e) => {
    if (!drawing) {
      return null
    }
    const ctx = contextRef.current
    const canvasPosition = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - canvasPosition.x
    const y = e.clientY - canvasPosition.y

    draw(ctx, y, x)
    socket.emit("cords", {x: e.clientX - canvasPosition.x, y: e.clientY - canvasPosition.y})
  }

  const startDraw = (ctx, x, y, width, color) => {
		ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const handleStartDraw = (e) => {
		if(!myTurn) {
			return null
		}
    setDrawing(true)

		const ctx = contextRef.current
    const canvasPosition = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - canvasPosition.x
		const y = e.clientY - canvasPosition.y
		const color = erasing ? "#FFFFFF" : brush.color

    startDraw(ctx, x, y, brush.thickness, color)
    socket.emit("startCords", {x, y, thickness: brush.thickness, color})
  }


  useEffect(() => {
		const handleRemoteDraw = (cords) => {
			const ctx = contextRef.current
			draw(ctx, cords.y, cords.x)
		}

		const handleRemoteStartDraw = (cords) => {
			const ctx = contextRef.current
			startDraw(ctx, cords.x, cords.y, cords.thickness, cords.color)
		}

		const handleRemoteClear = () => {
			const ctx = contextRef.current
			clearCanvas(ctx, canvasRef.current.width, canvasRef.current.height)
		}

		socket.on('cords', (data) => {
			handleRemoteDraw(data)
		})

		socket.on('clear', () => {
			handleRemoteClear()
		})

		socket.on('startCords', (data) => {
			handleRemoteStartDraw(data)
		})

		const canvas = canvasRef.current
		contextRef.current = canvas.getContext('2d')
		canvas.width = 800
		canvas.height = 500
	}, [socket])

	const CurrentIcon = () => {
    if (erasing) {
      return Eraser
		} else if (brush.thickness > 10) {
			return BrushBig
		} else {
			return BrushSmall
		}
		
  }
	
	return(
		<div>
			<canvas id="can" style={{border: "3px solid red", cursor: `url(${CurrentIcon()}) 0 50, auto`}} ref={canvasRef} 
			onMouseDown={handleStartDraw}
			onMouseUp={() => setDrawing(false)}
			onMouseMove={handleDraw}
			/>
			<div>
				<button onClick={handleClearCanvas}>Clear</button>
				<label htmlFor="thickness">Thickness</label>
          <input 
            type="range" 
            id="thickness" 
            min="2" 
            max="20"
            value={brush.thickness}
            onChange={({ target }) => setBrush({...brush, thickness: parseInt(target.value)})}
          />
					<label htmlFor="color">Color</label>
					<input
						type="color" 
						id="color" 
						name="favcolor" 
						value={brush.color}
						onChange={({ target }) => setBrush({...brush, color: target.value})}
					/>
					<button onClick={() => setErasing(!erasing)}>{erasing ? "draw" : "erase"}</button>
			</div>
		</div>
	)
}

export default Canvas