import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  useEffect(() => {
    axios.get("http://localhost:3000").then(res => console.log(res.data))
  }, [])

  useEffect(() => {
    console.log("connect");
    const socket = new WebSocket("ws://localhost:3000/ws")
    return () => socket.close()
  })

  return (
    <>
      hello world
    </> 
  )
}

export default App
