import { useState } from 'react'
import Header from "../Header/Header.jsx";
import Nav from "../Nav/Nav.jsx";
import Cart from '../Cart/Cart.jsx'
import cartData from './../../Data/Cart.json'
import productsData from './../../Data/products.json'
import ProductList  from '../ProductList/ProductList.jsx'
import './App.scss'
import Footer from "../Footer/Footer.jsx";
function App() {
  const [cart, setCart] = useState(cartData)
  const [navActive, setNavActive] = useState("burgers")
  const [products, setProducts] = useState(productsData)

  const stateCart = {cart, setCart}
  const stateNav = {navActive, setNavActive}
  const stateProducts = {products, setProducts}
  return (
    <>
      <Header/>
      <Nav stateNav={stateNav}/>
      <main>
        <div className="container">
          <Cart stateCart={stateCart}/>
          <ProductList stateCart = {stateCart} navActive={navActive} stateProducts={stateProducts}/>
        </div>
      </main>
      <Footer/>

    </>
  )
}

export default App
