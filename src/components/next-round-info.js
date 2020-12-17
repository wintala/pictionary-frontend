import React, {useState} from "react"

const NextRoundInfo = ({socket}) => {
	const [word, setWord] = useState("")

	return (
		<div>
		<input
			type="text"
			placeholder="word to draw"
			value={word}
			onChange={({ target }) => setWord(target.value)}
		/>
		<button onClick={() => socket.emit("nextTurn", word)}>next turn</button>
		<button onClick={() => socket.emit("startOver")}>start over</button>
	</div>
	)
}

export default NextRoundInfo