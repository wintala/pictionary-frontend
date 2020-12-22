import React, {useState} from "react"

const NextRoundInfo = ({socket, myTurn, game}) => {
	const [word, setWord] = useState("")

	if (game.timeLeft !== 0) {
		return null
	}

	const turnplayerName = () => {
    const player = game.players.find(p => p.id === game.turnPlayer)
    if (player) {
      return player.name
    }
    else {
      return null
    }
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
						<th>
							Pisteet
						</th>
					</tr>
					{game.players.sort((a, b) => (b.pointsCurrentRound - a.pointsCurrentRound)).map(p =>
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
	<div id="round-info-wrap">
		{game.turnIndex !== 1 ?
		<>
		<div>Vastaus: {game.currentWord}</div>
		{roundresults(game.turnIndex === game.maxTurns + 1)}
		</>:
		<h1>Peli alkaa</h1>
		}
		{game.turnIndex !== game.maxTurns + 1 ?
		<div>
			Seuraavana vuorossa: {turnplayerName()}
		</div> :
		<button className="confirm-button" onClick={() => socket.emit("startOver")}>Pelaa uudestaan</button>
		}
		{myTurn && !(game.turnIndex === game.maxTurns + 1)?
		<div>
			<div className="input-container">
				<input
					type="text"
					required
					value={word}
					onChange={({ target }) => setWord(target.value)}
				/>
				<label>Sana</label>
				<div id="word-input-info">Kirjoita sana tai jätä tyhjäksi halutessasi satunnaisen sanan</div>
			</div>
			<button className="confirm-button" onClick={() => socket.emit("nextTurn", word) && setWord("")}>Aloita vuoro</button>
		</div>: null}
	</div>
	)
}

export default NextRoundInfo