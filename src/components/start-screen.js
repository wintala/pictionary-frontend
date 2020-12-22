import React, {useState} from "react"
import GameCreationForm from "./game-creation-form"
import JoinigForm from "./joinig-form"

const StartScreen = ({socket, name}) => {
	const [display, setDislay] = useState({creating: false, joinig: false, info: false})

	return (
	<div id="start-screen-wrap">
		<h1>PIIRRÄ JA ARVAA</h1>
		<button 
			onClick={() => setDislay({info:false, creating: !display.creating, joinig: false})}
			className="start-button-main">
			Luo peli
		</button>
		{display.creating ? <GameCreationForm socket={socket} name={name}/>: null}
		<button 
			onClick={() => setDislay({info:false, creating: false, joinig: !display.joinig})}
			className="start-button-main">
				Liity peliin
		</button>
		{display.joinig ? <JoinigForm socket={socket}  name={name}/> : null}
		<button className="start-button-main" onClick={() => setDislay({joinig: false, creating: false, info: !display.info})}>Ohjeet</button>
		{display.info ? 
		<div className="start-main-div" style={{width: "400px"}}>
			Aloitus: <br></br> Luo peli ja jaa pelin ID ystävillesi, tai liity peliin ystäväsi lähettämällä ID:llä
			<br></br>
			<br></br>
			Pelin kulku: <br></br> Vuorossa oleva pelaaja piirtää sanaa (joko itse keksittyä tai pelin generoimaa) muiden pelaajien yrittäessä arvata tätä mahdollisimman nopeasti
			<br></br>
			<br></br>
			Pisteet: <br></br> Piirtäjä saa pisteitä, kun yli puolet pelaajista arvaa sanan. Arvaajat saavat pisteet riippuen siitä, kuinka monentena he arvasivat sanan
		</div> : null}
	</div>
	)
}

export default StartScreen