import { useState } from 'react'
import Header from "./components/Header/Header.jsx";
import Nav from "./components/Nav/Nav.jsx";
import './App.scss'
import Cart from './components/Cart/Cart.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Nav/>
      <Cart/>
    </>
  )
}

export default App
