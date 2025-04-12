export default function addToCart(product, cart, setCart) {
  const newCart = [...cart];
  const existingProductIndex = newCart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    newCart[existingProductIndex].quantity += product.quantity || 1;
  } else {
    const newProduct = {...product};
    newProduct.quantity = product.quantity || 1;
    newCart.push(newProduct);
  }
  
  setCart(newCart);
}

