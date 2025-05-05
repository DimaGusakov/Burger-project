import { useState } from 'react'
import Header from "../../components/Header/Header.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import Cart from '../../components/Cart/Cart.jsx'
import ModalContent from '../../components/ModalContent/ModalContent.jsx'
import productsData from './../../Data/products.json'
import ProductList from '../../components/ProductList/ProductList.jsx'
import Footer from '../../components/Footer/Footer.jsx'

export default function Home() {
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
      <ModalContent stateCart={stateCart} stateModal={stateModal} stateModalContent={stateModalContent} stateSelectedProduct={stateSelectedProduct} /> 
      <Footer />
    </>
    
  )
}
