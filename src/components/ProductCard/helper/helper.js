export default function addToCart(product, cart, setCart) {
  const newCart = [...cart]
  const copyItem = newCart.find(item => item.id === product.id)
  if (copyItem) {
    copyItem.quantity += 1
  } else {
    newCart.push({...product, quantity: 1})
  }
  setCart(newCart)
}