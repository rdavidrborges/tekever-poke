import { createSlice } from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        value: []
    },
    reducers: {
        /**
         * add pokemon name to favorite stack 
         * @param {*} state current state
         * @param {*} action value to be added from state
         */
        add: (state, action) => {
            state.value.push(action.payload)
        },
        /**
         * remove pokemon name from favorite stack 
         * @param {*} state current state
         * @param {*} action value to be removed from state
         */
        remove: (state, action) => {
            state.value = state.value.filter(elem => elem !== action.payload)
        },
    },
})

//export both(add/remove) reducers
export const { add, remove } = favoritesSlice.actions

export default favoritesSlice.reducer

