import socketIOClient from "socket.io-client"
import React, {useState, useEffect, useRef} from "react"
import Chat from "./components/chat";
import Canvas from "./components/canvas";
import StartScreen from "./components/start-screen"
import NextRoundInfo from "./components/next-round-info"

const socket = socketIOClient("http://localhost:3001")

function App() {
  const name = useRef()
  const [game, setGame] = useState(null)



  useEffect(() => {
    socket.on('gameInfo', (data) => {
      setGame(data)
    })
    return () => socket.disconnect()
  }, [])


  const turnplayerName = () => {
    const player = game.players.find(p => p.id === game.turnPlayer)
    if (player) {
      return player.name
    }
    else {
      return null
    }
  }

  return (
  <>
    {!game ?
    <>
      <StartScreen socket={socket} name={name} />
    </> : 
    <>
    <div><pre>{JSON.stringify(game, undefined, 2)}</pre></div>
    <NextRoundInfo socket={socket} />
    <Canvas socket={socket} myTurn={(name.current === turnplayerName()) && (game.timeLeft !== 0)} />
    <Chat socket={socket} />
    </>}
  </>
  )
}

export default App;
