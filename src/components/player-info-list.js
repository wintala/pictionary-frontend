import React from "react"

const PlayerInfoList = ({players, turnPlayer}) => {

	if (!players) {
		return null
	}

	return (
		<table id="player-info">
			<tbody>
				<tr>
					<th>
						Nimi
					</th>
					<th>
						Pisteet
					</th>
					<th>
						Kierroksen pisteet
					</th>
					<th>
					</th>
				</tr>
				{players.sort((a, b) => (b.pointsTotal - a.pointsTotal)).map(p =>
				<tr key={p.id}>
					<td>
						{p.name}
					</td>
					<td>
						{p.pointsTotal}
					</td>
					<td>
						{p.pointsCurrentRound}
					</td>
					<td>
						{turnPlayer === p.id ? 
						<div id="drawer-icon"></div>: ""}
					</td>
				</tr>
				)}
			</tbody>
		</table>
	)
}

export default PlayerInfoList