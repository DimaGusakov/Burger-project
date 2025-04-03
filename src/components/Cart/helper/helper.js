export const changeQuantity = (id, change, cart, setCart) => {

  const currentQuantity = cart.find(item => item.id === id).quantity;

  if (currentQuantity === 1 && change === -1) {
    const filterArr = cart.filter(item => item.id !== id);
    setCart(filterArr);
    return
  }
  const arr = cart.map(item => {

    if (item.id === id) {
      const newQuantity = item.quantity + change;
      return {
        ...item,
        quantity: newQuantity
      }
    }
    return item
  })
  setCart(arr)
};