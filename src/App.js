import socketIOClient from "socket.io-client"
import React, {useState, useEffect, useRef} from "react"
import Chat from "./components/chat";
import Canvas from "./components/canvas";
import StartScreen from "./components/start-screen"
import NextRoundInfo from "./components/next-round-info"
import PlayerInfoList from "./components/player-info-list"
import Lobby from "./components/lobby";

const socket = socketIOClient()

function App() {
  const name = useRef()
  const [game, setGame] = useState(null)
  const [word, setWord] = useState("")

  useEffect(() => {
    socket.on('gameInfo', (data) => {
      setGame(data)
    })
    socket.on('word', (data) => {
      setWord(data)
    })
    return () => socket.disconnect()
  }, [])


  return (
  <>
    {!game ?
      <StartScreen socket={socket} name={name} />: 
    <>
    {game.started ? 
    <div id="palying-wrap">
    <NextRoundInfo 
      socket={socket} 
      myTurn={(socket.id === game.turnPlayer)}
      game={game}
    />
    <div id="time-displayer">Aika: {game.timeLeft}</div>
    <div id="word-displayer">Sana: {word}</div>
    <PlayerInfoList players={game.players} turnPlayer={game.turnPlayer}/>
    <Canvas socket={socket} myTurn={(socket.id === game.turnPlayer) && (game.timeLeft !== 0)} />
    <Chat socket={socket} name={name.current}/>
    </div> :
    <Lobby socket={socket} game={game} myTurn={(socket.id === game.turnPlayer)}/>}
    </>}
  </>
  )
}

export default App;
