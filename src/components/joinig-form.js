import React, {useState} from "react";

const JoinigForm = ({socket, name}) => {
	const [roomString, setRoomString] = useState("")
	const [nameInput, setName] = useState("")

	const handleRoomJoin = () => {
    socket.emit("joinGame", {room: roomString, name: nameInput})
    name.current = nameInput
	}
	
	return(
		<div className="start-main-div">
			<div className="input-container">
				<input
				type="text"
				required
				value={roomString}
				onChange={({ target }) => setRoomString(target.value)}
				/>
				<label>Pelin ID</label>
			</div>
			<div className="input-container">
				<input
				id="username"
				type="text"
				required
				value={nameInput}
				onChange={({ target }) => setName(target.value)}
				/>
				<label>Nimimerkki</label>
			</div>
			<button className="confirm-button" onClick={handleRoomJoin}>Liity</button>
		</div>
	)
}

export default JoinigForm