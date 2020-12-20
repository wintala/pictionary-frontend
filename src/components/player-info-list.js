import React from "react"

const PlayerInfoList = ({players, turnPlayerName}) => {

	if (!players) {
		return null
	}

	return (
		<table>
			<tbody>
				<tr>
					<th>
						Name
					</th>
					<th>
						Points
					</th>
					<th>
						Points this round
					</th>
					<th>
					</th>
				</tr>
				{players.map(p =>
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
						{turnPlayerName === p.name ? "drawing" : ""}
					</td>
				</tr>
				)}
			</tbody>
		</table>
	)
}

export default PlayerInfoList