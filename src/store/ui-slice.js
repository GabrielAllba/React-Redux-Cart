import {createSlice} from '@reduxjs/toolkit'

createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false
    },
    reducers: {
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        }
    }

})