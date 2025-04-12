import React from 'react'
import { useState } from 'react'
import Header from "../Header/Header.jsx";
import Nav from "../Nav/Nav.jsx";
import Cart from '../Cart/Cart.jsx'
import ModalContent from '../ModalContent/ModalContent.jsx'
import productsData from './../../Data/products.json'
import ProductList from '../ProductList/ProductList.jsx'
import './App.scss'
import Footer from "../Footer/Footer.jsx";
function App() {
  const [cart, setCart] = useState([])
  const [navActive, setNavActive] = useState("burgers")
  const [products, setProducts] = useState(productsData)
  const [modalActive, setModalActive] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const [modalContent, setModalContent] = useState(null)
  const stateModal = { modalActive, setModalActive }

  
  const stateModalContent = { modalContent, setModalContent }
  const stateCart = { cart, setCart }
  const stateNav = { navActive, setNavActive }
  const stateProducts = { products, setProducts }
  const stateSelectedProduct = { selectedProduct, setSelectedProduct }
  return (
    <>
      <Header stateCart={stateCart} stateProducts={stateProducts} />
      <Nav stateNav={stateNav} />
      
      <main>
        <div className="container">
          <Cart stateCart={stateCart} stateModalContent={stateModalContent} stateModal={stateModal} />
          <ProductList
            navActive={navActive}
            stateProducts={stateProducts}
            stateSelectedProduct={stateSelectedProduct}
            stateModal={stateModal}
            stateCart={stateCart}
            stateModalContent={stateModalContent}
          />
        </div>
      </main>
      <Footer/>
      <ModalContent stateCart={stateCart} stateModal={stateModal} stateModalContent={stateModalContent} stateSelectedProduct={stateSelectedProduct} />
    </>
  )
}

export default App
