import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../reducers/favorites'

export default configureStore({
    reducer: {
        favorites: favoritesReducer
    },
})