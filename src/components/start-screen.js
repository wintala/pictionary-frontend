import React, {useRef, useState} from "react"

const StartScreen = ({socket, name}) => {
	const [nameInput, setName] = useState("")
	const [roomString, setRoomString] = useState("")
	const roundNumRef = useRef()
	const roundDurationRef = useRef()

	const handleRoomCreation = () => {
		const maxTurns = parseInt(roundNumRef.current.value)
		const timeLimit = parseInt(roundDurationRef.current.value)
		socket.emit("createGame", {name: nameInput, maxTurns, timeLimit})
    name.current = nameInput
  }

  const handleRoomJoin = () => {
    socket.emit("joinGame", {room: roomString, name: nameInput})
    name.current = nameInput
  }

	return (
	<div>
		<select key="end" defaultValue={"10"} ref={roundNumRef}>
			{[5, 10, 15, 20, 25, 30, 35, 40].map(v => <option key={v}>{v}</option>)}
		</select>

		<select key="ens" defaultValue={"60"} ref={roundDurationRef}>
			{[5, 30, 40, 50, 60, 70, 80, 90].map(v => <option key={v}>{v}</option>)}
		</select>

		<input
			type="text"
			placeholder="username"
			value={nameInput}
			onChange={({ target }) => setName(target.value)}
		/>
		<button onClick={handleRoomCreation}>Create room</button>
		<div>
			<input
			type="text"
			placeholder="room ID"
			value={roomString}
			onChange={({ target }) => setRoomString(target.value)}
			/>
			<button onClick={handleRoomJoin}>Join</button>
		</div>
	</div>
	)
}

export default StartScreen