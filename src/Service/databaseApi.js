import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import {ref, set, get, push, remove, update, onValue, off, query} from 'firebase/database'
import { db } from '../firebase/firebase'

export const databaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'Products', 'Orders'],

  endpoints: (builder) => ({
    getUser : builder.query({
      queryFn : async (userId) => {
        try {
          const userRef = ref(db, `users/${userId}`)
          const snapshot = await get(userRef)

          if (snapshot.exists()) {
            return {data : snapshot.val()}
          }
          return {data: null}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      providesTags: ['User']
    }),

    addUser: builder.mutation({
      queryFn : async({userId, userData}) => {
        try {
          const userRef = ref(db, `users/${userId}`)
          await set(userRef, userData)
          return {data: {success: true}}
        }
        catch (error) {
           return {error: error.message}
        }
      },
      invalidatesTags: ['User']
    }),

    updateUser : builder.mutation({
      queryFn: async ({userId, userData}) => {
        try {
          const userRef = ref(db, `users/${userId}`)
          await update(userRef, userData)
          return {data: { success: true}}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: ['User']
    }),

    deleteUser : builder.mutation({
      queryFn : async ({userId}) => {
        try {
          const userRef = ref(db, `users/${userId}`)
          await remove(userRef)
          return {data: {success: true}}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: ['User']
    }),

    getProducts : builder.query({
      queryFn : async () => {
        try {
          const productsRef = ref(db, 'products')
          const snapshot = await get(productsRef)

          if (snapshot.exists()) {
            return {data : snapshot.val()}
          }
          return {data: null}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      providesTags: ['Products']
    }),

    addProduct : builder.mutation({
      queryFn : async ({productId, productData}) => {
        try {
          const productRef = ref(db, `products/${productId}`)
          await set(productRef, productData)
          return {data: {success: true}}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: ['Products'],
      async onQueryStarted({productId, productData}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          databaseApi.util.updateQueryData('getProducts', undefined, draft => {
            draft[productId] = productData;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),

    updateProduct : builder.mutation({
      queryFn : async ({productId, productData}) => {
        try {
          const productRef = ref(db, `products/${productId}`)
          await update(productRef, productData)
          return {data: {success: true}}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: ['Products'],
      async onQueryStarted({productId, productData}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          databaseApi.util.updateQueryData('getProducts', undefined, draft => {
            draft[productId] = productData;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),

    deleteProduct : builder.mutation({
      queryFn : async ({productId}) => {
        try {
          const productRef = ref(db, `products/${productId}`)
          await remove(productRef)
          return {data: {success: true}}
        }
        catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: ['Products']
    }),

    getOrders: builder.query({
      queryFn: async (userId) => {
        try {
          const ordersRef = ref(db, `orders/${userId}`);
          const snapshot = await get(ordersRef);

          if (snapshot.exists()) {
            return { data: snapshot.val() };
          }
          return { data: {} };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ['Orders']
    }),

    addOrder: builder.mutation({
      queryFn: async ({ userId, orderData }) => {
        try {
          const ordersRef = ref(db, `orders/${userId}`);
          const newOrderRef = push(ordersRef);
          const orderId = newOrderRef.key;
          
          const orderWithId = {
            ...orderData,
            id: orderId,
          };
          
          await set(newOrderRef, orderWithId);
          return { data: { success: true, orderId } };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Orders']
    }),

    updateOrderStatus: builder.mutation({
      queryFn: async ({ userId, orderId, status }) => {
        try {
          const orderRef = ref(db, `orders/${userId}/${orderId}`);
          await update(orderRef, { status });
          return { data: { success: true } };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Orders']
    }),

    deleteOrder: builder.mutation({
      queryFn: async ({ userId, orderId }) => {
        try {
          const orderRef = ref(db, `orders/${userId}/${orderId}`);
          await remove(orderRef);
          return { data: { success: true } };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Orders']
    }),

    getAllOrders: builder.query({
      queryFn: async () => {
        try {
          const ordersRef = ref(db, 'orders');
          const snapshot = await get(ordersRef);
          
          if (snapshot.exists()) {
            const allOrders = [];
            const data = snapshot.val();
            
            Object.keys(data).forEach(userId => {
      
              Object.values(data[userId]).forEach(order => {
                allOrders.push({
                  ...order,
                  userId 
                });
              });
            });
            
            return { data: allOrders };
          }
          
          return { data: [] };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ['Orders']
    })

  })
})

export const {
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery
} = databaseApi