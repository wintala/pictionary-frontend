import React from "react"

const Lobby = ({socket, game, myTurn}) => {

	return(
		<div id="lobby-wrap">
			<h1>Odotustila</h1>
			<h2>Peli info</h2>
			<table>
				<tbody>
					<tr>
						<td>
							Peli Id:
						</td>
						<td>
							{game.id}
						</td>
					</tr>
					<tr>
						<td>
							Vuoroja:
						</td>
						<td>
							{game.maxTurns}
						</td>
					</tr>
					<tr>
						<td>
							Vuoron kesto:
						</td>
						<td>
							{game.timeLimit}
						</td>
					</tr>
				</tbody>
			</table>
			<h2>Pelaajat</h2>
			<ul>
				{game.players.map(p => 
					<li key={p.id}>{p.name}</li>
					)}
			</ul>
			{myTurn ?
			<button className="confirm-button" onClick={() => socket.emit("start")}>Aloita peli</button> :
			<div>Odota että host aloittaa pelin</div>}
		</div>
	)
}

export default Lobby