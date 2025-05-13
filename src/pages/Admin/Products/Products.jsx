import Nav from "../../../components/Nav/Nav"
import { useState, useEffect } from "react"
import { useAddProductMutation, useUpdateProductMutation } from '../../../Service/databaseApi.js'
import ModalProducts from "./ModalProducts/ModalProducts"
import { useGetProductsQuery } from '../../../Service/databaseApi.js';

import './Products.scss'

export default function Products() {
  const [navActive, setNavActive] = useState("burgers")
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Запрос продуктов из БД
  const { data: products, isLoading, isError } = useGetProductsQuery()
  // Мутация для обновления категории продуктов (включает удаление и добавление)
  const [updateProduct] = useUpdateProductMutation()
  // Состояние текущего редактируемого продукта
  const [editingProduct, setEditingProduct] = useState(null)
  // Функция удаления продукта
  const handleDelete = async (productId) => {
    if (!products || !products[navActive]) return
    const categoryData = products[navActive]
    const newItems = categoryData.items.filter(item => item.id !== productId)
    await updateProduct({ productId: navActive, productData: { ...categoryData, items: newItems } })
  }

  return (
    <>
      <ModalProducts
        navActive={navActive}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <div className="products">
        <div className="products-wrapper">
          <h1>Продукты</h1>
          <Nav stateNav={{ navActive, setNavActive }} />

          <div className="products-content">
            <button className="add-product-button" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
              Добавить продукт
            </button>
          </div>
          <div className="product-grid">
            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка при загрузке продуктов</p>}
            {products && products[navActive] && products[navActive].items.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.price}₽</p>
                  <span>{product.weight}</span>
                </div>
                <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}>Исправить</button>
                <button onClick={() => handleDelete(product.id)}>Удалить</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
