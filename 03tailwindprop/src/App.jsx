import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "AI Engineering intern At iRED",
    age: 21
  }
  let newArr = [1, 2, 3]

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>REACT JS</h1>
      <Card username="About me" btnText="click me" />
      <Card username="AI Engineering intern At iRED" />
    </>
  )
}

export default App