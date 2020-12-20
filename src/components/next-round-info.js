import React, {useState} from "react"

const NextRoundInfo = ({socket, myTurn, turnPlayerName, game}) => {
	const [word, setWord] = useState("")

	if (game.timeLeft !== 0) {
		return null
	}


	const roundresults = (last) => (
		<>
			{last ? 
			<>
			<h1>Peli loppui</h1> 
			<h2>Tulokset:</h2> 
			</>
			: 
			<h2>Kierroksen tulokset:</h2> }
				<table>
				<tbody>
					<tr>
						<th>
							Nimi
						</th>
						{last ? 
						<th>
							Pisteet
						</th> :
						<th>
							Kierroksen pisteet
						</th>}
					</tr>
					{game.players.map(p =>
					<tr key={p.id}>
						<td>
							{p.name}
						</td>
						{last ?
						<td>
							{p.pointsTotal}
						</td> :
						<td>
							{p.pointsCurrentRound}
						</td>}
					</tr>
					)}
				</tbody>
			</table>
		</>
	)


	return (
	<div style={{border: "3px solid green"}}>
		{game.turnIndex !== 1 ?
		roundresults(game.turnIndex === game.maxTurns + 1) :
		<h1>Peli alkaa</h1>
		}
		{game.turnIndex !== game.maxTurns + 1 ?
		<div>
			Seuraavana vuorossa: {turnPlayerName}
		</div> :
		<button onClick={() => socket.emit("startOver")}>Pelaa uudestaan</button>
		}
		{myTurn && !(game.turnIndex === game.maxTurns + 1)?
		<div>
			<input
				type="text"
				placeholder="word to draw"
				value={word}
				onChange={({ target }) => setWord(target.value)}
			/>
			<button onClick={() => socket.emit("nextTurn", word)}>Aloita vuoro</button>
		</div>: null}
	</div>
	)
}

export default NextRoundInfo