import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/Modal/Modal';
import './ModalProducts.scss'

import { useAddProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../../../Service/databaseApi'
export default function ModalProducts({ navActive, isModalOpen, setIsModalOpen, editingProduct, setEditingProduct }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [weight, setWeight] = useState('')
  const [calories, setCalories] = useState('')
  const [ingredients, setIngredients] = useState([])
  
  const [addProduct, {isLoading}] = useAddProductMutation()
  const { data: productsData } = useGetProductsQuery()
  const [updateProduct] = useUpdateProductMutation()

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '')
      setDescription(editingProduct.description || '')
      setPrice(editingProduct.price || '')
      setWeight(editingProduct.weight || '')
      setCalories(editingProduct.calories || '')
      setImage(editingProduct.image || '')
      setIngredients(editingProduct.ingredients || [])
    } else {
      setName('')
      setDescription('')
      setPrice('')
      setWeight('')
      setCalories('')
      setImage('')
      setIngredients([])
    }
  }, [editingProduct, isModalOpen])

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const data = new FormData()
    data.append('file', file)
    data.append("upload_preset", "Products")
    data.append("cloud_name", "dzslmj6e3")
    const res = await fetch("https://api.cloudinary.com/v1_1/dzslmj6e3/image/upload", {
      method: "POST",
      body: data
    })
    const uploudedImageUrl = await res.json()
    setImage(uploudedImageUrl.url)
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    const id = navActive;
    const categoryData = productsData[id] || { title: id.charAt(0).toUpperCase() + id.slice(1), items: [] };
    const productId = editingProduct ? editingProduct.id : Date.now().toString();
    const updatedProduct = { id: productId, name, image, description, price, weight, calories, ingredients };
    let newItems;
    if (editingProduct) {
      newItems = categoryData.items.map(item => item.id === productId ? updatedProduct : item);
    } else {
      newItems = [...(categoryData.items || []), updatedProduct];
    }
    await updateProduct({ productId: id, productData: { ...categoryData, items: newItems } }).unwrap();
    
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="modal__products">
      <input type="text" placeholder="Название" 
        value={name} 
        onChange={(e) => setName(e.target.value)} />
      <div className='products-content'>
        <div className='products-content__image'>
          { 
            image && (
              <div>
                <img src={image} alt="" />
              </div>
            )
          }
          <input 
            type="file" 
            onChange={handleFileUpload}         
          />
        </div>
        <div className='products-content__description'>
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='products-content__description-weight'>
            <input
              type="text"
              placeholder="Граммовка"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ккал"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
            <div className={`products-content__description-ingredients ${ingredients.length > 3 ? 'scrollable' : ''}`}>  
            <label>Ингредиенты:</label>
            {ingredients.map((ing, index) => (
              <div key={index} className="products-content__description-ingredients-item">
                <input
                  type="text"
                  placeholder={`Ингредиент ${index + 1}`}
                  value={ing}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeIngredient(index)}>Удалить</button>
              </div>
            ))}
            <button type="button" onClick={addIngredient}>Добавить ингредиент</button>
          </div>
        </div>    
      </div>    
      <div className="products-content__buttons">
        <button onClick={handleSubmit}>{editingProduct ? 'Сохранить' : 'Создать'}</button>
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </Modal>
  );
}