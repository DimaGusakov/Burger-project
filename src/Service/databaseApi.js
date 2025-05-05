import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import {ref, set, get, push, remove, update, onValue, off, query} from 'firebase/database'
import { db } from '../firebase/firebase'

export const databaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],

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
    })

  })
})

export const {
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = databaseApi