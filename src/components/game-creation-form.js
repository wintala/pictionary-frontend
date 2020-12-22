import React, {useState, useRef} from "react";

const GameCreationForm = ({socket, name}) => {
	const [nameInput, setName] = useState("")
	const roundNumRef = useRef()
	const roundDurationRef = useRef()

	const handleRoomCreation = () => {
		const maxTurns = parseInt(roundNumRef.current.value)
		const timeLimit = parseInt(roundDurationRef.current.value)
		socket.emit("createGame", {name: nameInput, maxTurns, timeLimit})
    name.current = nameInput
	}
	
	return(
		<div className="start-main-div">
			<label htmlFor="rounds">Vuoroja</label>
			<select key="rounds" defaultValue={"10"} ref={roundNumRef}>
				{[5, 10, 15, 20, 25, 30, 40, 50, 60].map(v => <option key={v}>{v}</option>)}
			</select>
			<label htmlFor="time-per-round">Aika vuoroa kohden</label>
			<select key="time-per-round" defaultValue={"60"} ref={roundDurationRef}>
				{[30, 40, 50, 60, 90, 120].map(v => <option key={v}>{v}</option>)}
			</select>
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
			<button className="confirm-button" onClick={handleRoomCreation}>Luo</button>
		</div>
	)

}

export default GameCreationForm