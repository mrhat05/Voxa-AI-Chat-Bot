import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store =configureStore({
    reducer:{
        auth:authSlice,
        darkMode:darkModeSlice
    }
})

export default store

