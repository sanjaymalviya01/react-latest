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
            // state.loggedInUser=[]
            // debugger
            if (!state.users.length && action.payload[0].users) {
                const newData = action.payload.users.map(user => {
                    const date = new Date(user.birthDate);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // add 1 since getMonth() returns 0-indexed month
                    const day = String(date.getDate()).padStart(2, '0');
                    user.birthDate = `${year}-${month}-${day}`
                    return user
                })    // const fetchedData = action.payload.users
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
                    debugger
                    // user = { ...user, updatedUser };
                }
            })
            // state.loggedInUser = { ...state.loggedInUser, updatedUser };

        },
        checkLoginInput: (state, action) => {
            // fetch('https://dummyjson.com/user/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({

            //       username: 'emilys',
            //       password: 'emilyspass',
            //       expiresInMins: 1, // optional, defaults to 60
            //     }),
            //   })
            //   .then(res => res.json())
            //   .then(console.log);


            const user = state.users.find((user) => user.username === action.payload.username)
            if (user) {
                // debugger
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