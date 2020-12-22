import React, {useRef} from "react"

const Lobby = ({socket, game, myTurn}) => {
	const id = useRef()

const handleCopy = () => {
	if (id.current) {
		id.current.select()
		document.execCommand('copy')
	}
}

const enoughPlayers = (game.players.length > 1) ? true : false

	return(
		<div id="lobby-wrap">
			<h1>Odotustila</h1>
			<h2>Peli info</h2>
			<table>
				<tbody>
					<tr>
						<td>Peli Id:</td>
						<td><input type="text" ref={id} readOnly={true} value={game.id}></input></td>
						<td><button onClick={handleCopy}>Kopioi</button></td>
					</tr>
					<tr>
						<td>Vuoroja:</td>
						<td>{game.maxTurns}</td>
						<td></td>
					</tr>
					<tr>
						<td>Vuoron kesto:</td>
						<td>{game.timeLimit}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<h2>Pelaajat</h2>
			<ul>
				{game.players.map((p, i) => 
					<li key={p.id}>{p.name}</li>
					)}
			</ul>
			{myTurn ?
			<>
			<button className="confirm-button" 
				onClick={() => socket.emit("start")}>
				Aloita peli
			</button>
			</>:
			<div>Odota että host aloittaa pelin</div>}
			{enoughPlayers ? null :
			<div id="not-startable">Voit kokeilla testimielessä toimintoja vaikka yksin, mutta mielekäs pelaaminen vaatii pelaajia kolme tai enemmän</div>}
		</div>
	)
}

export default Lobby