import React, {useRef, useState} from "react"

const StartScreen = ({socket, name}) => {
	const [display, setDislay] = useState({creating: false, joinig: false, info: false})
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
	
	const userNameInput = () => (
		<div className="input-container">
			<input
			id="username"
			type="text"
			required
			value={nameInput}
			onChange={({ target }) => setName(target.value)}
			/>
			<label>Username</label>
		</div>
	)

	return (
	<div id="start-screen-wrap">
		<h1>PIIRRÄ JA ARVAA</h1>
		<button 
			onClick={() => setDislay({info:false, creating: !display.creating, joinig: false})}
			className="start-button-main"
		>Luo peli</button>
		{display.creating ? 
		<div className="start-main-div">
			<label htmlFor="rounds">Vuoroja</label>
			<select key="rounds" defaultValue={"10"} ref={roundNumRef}>
				{[3, 5, 10, 15, 20, 25, 30, 35, 40].map(v => <option key={v}>{v}</option>)}
			</select>
			<label htmlFor="time-per-round">Aika vuoroa kohden</label>
			<select key="time-per-round" defaultValue={"60"} ref={roundDurationRef}>
				{[5, 30, 40, 50, 60, 70, 80, 90].map(v => <option key={v}>{v}</option>)}
			</select>
			{userNameInput()}
			<button className="confirm-button" onClick={handleRoomCreation}>Create</button>
		</div> : null}
		<button 
			onClick={() => setDislay({info:false, creating: false, joinig: !display.joinig})}
			className="start-button-main">
				Liity peliin
		</button>
		{display.joinig ? 
		<div className="start-main-div">
			<div className="input-container">
				<input
				type="text"
				required
				value={roomString}
				onChange={({ target }) => setRoomString(target.value)}
				/>
				<label>Game ID</label>
			</div>
			{userNameInput()}
			<button className="confirm-button" onClick={handleRoomJoin}>Join</button>
		</div> : null}
		<button className="start-button-main" onClick={() => setDislay({joinig: false, creating: false, info: !display.info})}>Ohjeet</button>
		{display.info ? 
		<div className="start-main-div" style={{width: "400px"}}>
			Aloitus: <br></br> Luo peli ja jaa pelin ID ystävillesi tai liity peliin ystäväsi lähettämällä ID:llä
			<br></br>
			<br></br>
			Pelin kulku: <br></br> Vuorossa oleva pelaaja keksii sanan ja piirtää tämän muiden pelaajien yrittäessä arvata oikeaa sanaa mahdollisimma nopeasti
			<br></br>
			<br></br>
			Pisteet: <br></br> Piirtäjä saa pisteitä kun yli puolet pelaajista arvaa sanan. Arvaajat saavat pisteet riippuen siitä kuinka monentena he arvasivat sanan
		</div> : null}
	</div>
	)
}

export default StartScreen