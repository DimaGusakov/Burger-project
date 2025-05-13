import { ProductCard } from '../ProductCard/ProductCard.jsx'

import './ProductList.scss'

export default function ProductList({ navActive, stateProducts = { products: null, isLoading: true }, stateModalContent, stateSelectedProduct, stateModal, stateCart }) {
  const { products, isLoading } = stateProducts;
  
  if (isLoading || !products) {
    return <div className="product-list-loading">Загрузка списка продуктов...</div>
  }

  if (!products[navActive]) {
    return <div className="product-list-error">Категория не найдена</div>
  }

  const productArr = products[navActive]
  return (
    <section className="product-list-container">
      <h2>{productArr.title}</h2>
      <div className="product-grid">
        {
          productArr.items && productArr.items.length > 0 ? (
            productArr.items.map(product => (
              <ProductCard 
                stateModalContent={stateModalContent} 
                navActive={navActive} 
                key={product.id} 
                product={product} 
                stateSelectedProduct={stateSelectedProduct}
                stateModal={stateModal}
                stateCart={stateCart}
              />
            ))
          ) : (
            <p>В этой категории пока нет товаров</p>
          )
        }
      </div>
    </section>
  )
}

