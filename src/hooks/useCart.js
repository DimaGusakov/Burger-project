import { useMemo } from 'react'
import { auth } from '../firebase/firebase'
import { useGetUserQuery, useAddUserMutation, useUpdateUserMutation } from '../Service/databaseApi'

export default function useCart() {
  const userId = auth.currentUser?.uid
  const skip = !userId
  const { data: userData, isLoading: isLoadingCart, error } = useGetUserQuery(userId, { skip })
  const [addUser] = useAddUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const cart = useMemo(() => userData?.cart || [], [userData])

  const persistCart = async (newCart) => {
    if (!userId) return
    if (!userData) {
      await addUser({ userId, userData: { cart: newCart } })
    } else {
      await updateUser({ userId, userData: { cart: newCart } })
    }
  }

  const addToCart = async (product) => {
    const existing = cart.find(item => item.id === product.id)
    let newCart
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: product.quantity || 1 }]
    }
    await persistCart(newCart)
  }

  const changeQuantity = async (id, delta) => {
    const existing = cart.find(item => item.id === id)
    if (!existing) return
    let newCart
    if (existing.quantity + delta <= 0) {
      newCart = cart.filter(item => item.id !== id)
    } else {
      newCart = cart.map(item =>
        item.id === id
          ? { ...item, quantity: existing.quantity + delta }
          : item
      )
    }
    await persistCart(newCart)
  }

  const removeFromCart = async (id) => {
    const newCart = cart.filter(item => item.id !== id)
    await persistCart(newCart)
  }

  const clearCart = async () => {
    await persistCart([])
  }

  const totalCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.quantity * item.price, 0), [cart])

  return {
    cart,
    isLoadingCart,
    isUpdating,
    error,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice
  }
} 