import React, {useEffect, useState, useRef} from "react"

const Chat = ({socket, name}) => {
	const [message, setMessage] = useState("")
	const [list, setList] = useState([])
	const messagesRef = useRef()

		useEffect(() => {
				socket.on('mes', (data) => {
					setList(list => list.concat(data))
				})
		},[socket])

		useEffect(() => {
			if (messagesRef.current.clientHeight > 520) {
				setList(list.slice(1))
			}
		}, [list])

	const handleSend = (e) => {
		const code = e.keyCode
		if (code === 	13){
			if (message) {
				socket.emit("mes", message)
				setMessage("")
			}
		}
	}

	
	return(
		<div id="chat">
			<ul ref={messagesRef}>
      {list.map((x, i) =>
      <li key={i}>
				<div style={{color: x.from === name ? "red" : "rgb(255, 110, 29)"}}> {x.from}</div>
        <div>{x.message}</div>
      </li>)}
			</ul>
			<input
				type="text"
				placeholder="Arvaus tai viesti"
				value={message}
				onChange={({ target }) => setMessage(target.value)}
				onKeyDown={handleSend}
			/>
		</div>
	)
}

export default Chat