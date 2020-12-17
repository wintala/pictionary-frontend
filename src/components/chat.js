import React, {useEffect, useState} from "react"

const Chat = ({socket}) => {
	const [message, setMessage] = useState("")
	const [list, setList] = useState([])

		useEffect(() => {
				socket.on('mes', (data) => {
					setList(list => list.concat(data))
				})
		},[socket])

	const handleSend = () => {
    socket.emit("mes", message)
	}
	
	return(
		<div>
			<input
			type="text"
			value={message}
			onChange={({ target }) => setMessage(target.value)}
			/>
			<button onClick={handleSend}>send</button>
			<ul>
      {list.map((x, i) => 
      <li key={i}>
        {x.message} {`from: ${x.from}`}
      </li>)}
    </ul>
		</div>
	)
}

export default Chat