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
        onLoginUser: (state, action) => {
            let user = action.payload
            user['wishlist'] = []
            user['cart'] = []

            if (state.loggedInUser.id != action.payload.id) {
                state.loggedInUser = user
            }
        },
        addToWishList: (state, action) => {
            const obj = state.loggedInUser
            if (Object.keys(obj).length !== 0) {
                if (state.loggedInUser.wishlist == undefined || state.loggedInUser.wishlist.length == 0) {
                    state.loggedInUser['wishlist'] = [action.payload]
                }
                const existingProduct = obj.wishlist.find((product) => product.id === action.payload.id)
                if (existingProduct == undefined || existingProduct.id != action.payload.id) {
                    state.loggedInUser.wishlist.push(action.payload)
                }
            }
        },
        removeFromWishlist: (state, action) => {
            state.loggedInUser.wishlist = state.loggedInUser.wishlist.filter((product) => product.id !== action.payload.id)
        },
        addToCart: (state, action) => {
            if (Object.keys(state.loggedInUser).length !== 0) {
                const existingProduct = state.loggedInUser.cart.find((product) => product.id === action.payload.id)
                if (existingProduct == undefined || existingProduct.id != action.payload.id) {

                    state.loggedInUser.cart.push(action.payload)
                    state.loggedInUser.cart.find((product) => {
                        if (product.id === action.payload.id) {
                            product['quantity'] = 1
                        }
                    })
                } else {
                    if (existingProduct.stock > existingProduct.quantity) {

                        existingProduct.quantity = existingProduct.quantity + 1
                    } else {

                        existingProduct.quantity = existingProduct.stock
                    }
                }
            }
        },
        setCartQuantity: (state, action) => {
            const Product = state.loggedInUser.cart.find((product) => product.id === action.payload[0].id)
            if (Product) {
                Product.quantity = parseInt(action.payload[1])
            } else {
                let newProduct = action.payload[0]

                newProduct['quantity'] = action.payload[1]
                state.loggedInUser.cart.push(newProduct)
                debugger
            }
        },
        removeFromCart: (state, action) => {
            state.loggedInUser.cart = state.loggedInUser.cart.filter((product) => product.id !== action.payload.id)
        },
        onUerLogOut: (state, action) => {
            // state.loggedInUser = {}
        }
    }
})

export const { fetchUsers, onUpdateUser, onLoginUser, onUerLogOut, addToWishList, addToCart, removeFromWishlist, removeFromCart, setCartQuantity } = userSlice.actions

export default userSlice.reducer