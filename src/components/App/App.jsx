import React from 'react'
import { useState } from 'react'
import Header from "../Header/Header.jsx";
import Nav from "../Nav/Nav.jsx";
import Cart from '../Cart/Cart.jsx'
import ModalDelivery from '../ModalDelivery/ModalDelivery.jsx'
import productsData from './../../Data/products.json'
import ProductList from '../ProductList/ProductList.jsx'
import './App.scss'
import Footer from "../Footer/Footer.jsx";
import ModalInfoCart from '../ModalInfoCart/ModalInfoCart.jsx'
function App() {
  const [cart, setCart] = useState([])
  const [navActive, setNavActive] = useState("burgers")
  const [products, setProducts] = useState(productsData)
  const [modalActive, setModalActive] = useState(false)
  const [modalDeliveryActive, setModalDeliveryActive] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const stateModal = { modalActive, setModalActive }
  const stateDeliveryModal = { modalDeliveryActive, setModalDeliveryActive }
  const stateCart = { cart, setCart }
  const stateNav = { navActive, setNavActive }
  const stateProducts = { products, setProducts }
  const stateSelectedProduct = { selectedProduct, setSelectedProduct }

  return (
    <>
      <Header />
      <Nav stateNav={stateNav} />
      <ModalInfoCart 
        stateModal={stateModal} 
        stateCart={stateCart}   
        stateSelectedProduct={stateSelectedProduct} 
      />
      <main>
        <div className="container">
          <Cart stateCart={stateCart} stateDeliveryModal={stateDeliveryModal} />
          <ProductList
            stateModal={stateModal}
            navActive={navActive}
            stateProducts={stateProducts}
            stateSelectedProduct={stateSelectedProduct}

          />
        </div>
      </main>
      <Footer/>
      <ModalDelivery stateDeliveryModal={stateDeliveryModal} />
    </>
  )
}

export default App
