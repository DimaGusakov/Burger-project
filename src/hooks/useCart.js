import { useMemo, useCallback } from 'react'
import { auth } from '../firebase/firebase'
import { useGetUserQuery, useAddUserMutation, useUpdateUserMutation } from '../Service/databaseApi'

export default function useCart() {
  const userId = auth.currentUser?.uid
  const skip = !userId
  const { data: userData, isLoading: isLoadingCart, error } = useGetUserQuery(userId, { skip })
  const [addUser] = useAddUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const cart = useMemo(() => userData?.cart || [], [userData])

  const persistCart = useCallback(async (newCart) => {
    if (!userId) return
    if (!userData) {
      await addUser({ userId, userData: { cart: newCart } })
    } else {
      await updateUser({ userId, userData: { cart: newCart } })
    }
  }, [userId, userData, addUser, updateUser])

  const addToCart = useCallback(async (product) => {
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
  }, [cart, persistCart])

  const changeQuantity = useCallback(async (id, delta) => {
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
  }, [cart, persistCart])

  const removeFromCart = useCallback(async (id) => {
    const newCart = cart.filter(item => item.id !== id)
    await persistCart(newCart)
  }, [cart, persistCart])

  const clearCart = useCallback(async () => {
    await persistCart([])
  }, [persistCart])

  const { totalCount, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalCount += item.quantity
        acc.totalPrice += item.quantity * item.price
        return acc
      },
      { totalCount: 0, totalPrice: 0 }
    )
  }, [cart])

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