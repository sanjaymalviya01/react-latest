import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    users: [],
    loggedInUser: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers: (state, action) => {
            if (!state.users.length && action.payload[0].users) {
                const newData = action.payload[0].users.map(user => {
                    const date = new Date(user.birthDate);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    user.birthDate = `${year}-${month}-${day}`
                    return user
                })
                state.users.push(...newData)
            }
            if (!state.products.length && action.payload[1].products) {
                state.products = action.payload[1].products
            }
        },
        onUpdateUser: (state, action) => {
            const updatedUser = action.payload
            state.users.find((user) => {
                if (user.id === action.payload.id) {
                    user = action.payload
                }
            })
        },
        checkLoginInput: (state, action) => {
            const user = state.users.find((user) => user.username === action.payload.username)
            if (user) {
                state.loggedInUser.push(user)
                state.loggedInUser[0]['token'] = action.payload.token
            } else {
                console.log("user not found")
            }
        },
        onUerLogOut: (state, action) => {
            state.loggedInUser = []
        }
    }
})

export const { fetchUsers, onUpdateUser, checkLoginInput, onUerLogOut } = userSlice.actions

export default userSlice.reducer