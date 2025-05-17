import { useState } from 'react'
import Header from "../../components/Header/Header.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import Cart from '../../components/Cart/Cart.jsx'
import ModalContent from '../../components/ModalContent/ModalContent.jsx'
import ProductList from '../../components/ProductList/ProductList.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { auth } from "../../firebase/firebase";
import { useGetProductsQuery, useGetUserQuery  } from '../../Service/databaseApi.js'
import useCart from '../../hooks/useCart'

export default function Home() {
  const [navActive, setNavActive] = useState("burgers")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const { data: products, isLoading, isError } = useGetProductsQuery()
  const userId = auth.currentUser?.uid
  const { data: userData } = useGetUserQuery(userId, {
    skip: !userId
  })
  const stateCart = useCart()
  const stateModal = { modalActive, setModalActive }
  const stateProducts = { products, isLoading, isError }
  const stateModalContent = { modalContent, setModalContent }
  const stateNav = { navActive, setNavActive }
  const stateSelectedProduct = { selectedProduct, setSelectedProduct }
  
  if (isLoading) {
    return <div className="loading">Загрузка данных...</div>
  }
  
  if (isError || !products) {
    return <div className="error">Ошибка загрузки данных</div>
  }
  
  return (
    <>
      <Header stateCart={stateCart} stateProducts={stateProducts} />
      <Nav stateNav={stateNav} />
      <main className='main'>
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
