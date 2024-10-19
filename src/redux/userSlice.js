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
            state.loggedInUser = action.payload
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
            // const Product = action.payload
            const cartProduct = obj.cart.find((product) => product.id === action.payload.id)
            if (Object.keys(obj).length !== 0) {

                if (cartProduct) {
                    const stock = cartProduct.stock
                    const newProduct = Object.assign({}, action.payload, { stock: stock })
                    state.loggedInUser.wishlist.push(newProduct)
                } else {
                    if (state.loggedInUser.wishlist == undefined || state.loggedInUser.wishlist.length == 0) {
                        // state.loggedInUser['wishlist'] = [action.payload]
                        const newProduct = Object.assign({}, action.payload)
                        state.loggedInUser['wishlist'] = [newProduct]
                    }
                    const existingProduct = obj.wishlist.find((product) => product.id === action.payload.id)
                    if (existingProduct == undefined || existingProduct.id != action.payload.id) {
                        // state.loggedInUser.wishlist.push(action.payload)
                        const newProduct = Object.assign({}, action.payload)
                        state.loggedInUser.wishlist.push(newProduct)
                    }
                }
            }
        },
        removeFromWishlist: (state, action) => {
            state.loggedInUser.wishlist = state.loggedInUser.wishlist.filter((product) => product.id !== action.payload.id)
        },
        addToCart: (state, action) => {
            if (Object.keys(state.loggedInUser).length !== 0 && action.payload.stock > 0) {
                const existingProduct = state.loggedInUser.cart.find((product) => product.id === action.payload.id)
                let wishlistProduct = state.loggedInUser.wishlist.find((product) => product.id === action.payload.id)
                // debugger
                if (existingProduct == undefined) {
                    const newProduct = Object.assign({}, action.payload, { quantity: 1, stock: action.payload.stock - 1 })
                    state.loggedInUser.cart.push(newProduct)
                } else {
                    if (existingProduct.stock > 0) {
                        existingProduct.quantity = existingProduct.quantity + 1
                        existingProduct.stock = existingProduct.stock - 1
                    } else {
                        existingProduct.quantity = existingProduct.stock
                        existingProduct.stock = 0
                    }
                }
                if (wishlistProduct != undefined) {
                    const cartProduct = state.loggedInUser.cart.find((product) => product.id === action.payload.id)
                    wishlistProduct.stock = cartProduct.stock
                    // wishlistProduct.stock = wishlistProduct.stock - cartProduct.quantity
                }
            }
        },
        setCartQuantity: (state, action) => {
            const Product = state.loggedInUser.cart.find((product) => product.id === action.payload[0].id)
            const stock = Product.stock + Product.quantity
            if (Product) {
                Product.quantity = parseInt(action.payload[1])
                Product.stock = stock - parseInt(action.payload[1])
            } else {
                const newProduct = Object.assign({}, action.payload[0], { quantity: action.payload[1], stock: action.payload[0].stock - action.payload[1] })
                state.loggedInUser.cart.push(newProduct)
            }
            state.loggedInUser.wishlist.find((product) => {
                if (product.id === action.payload[0].id)
                    product.stock = stock - action.payload[1]
            }
            )
        },
        removeFromCart: (state, action) => {
            const cartProduct = state.loggedInUser.cart.find((product) => product.id == action.payload.id)
            const stock = cartProduct.stock + cartProduct.quantity
            state.loggedInUser.wishlist.find((product) => { if (product.id == action.payload.id) { product.stock = stock } })
            state.loggedInUser.cart = state.loggedInUser.cart.filter((product) => product.id !== action.payload.id)
        },
        updateCheckoutInfo: (state, action) => {
            state.loggedInUser['checkoutInfo'] = action.payload

        },
        onUerLogOut: (state, action) => {
            // state.loggedInUser = {}
        }
    }
})

export const { fetchUsers, onUpdateUser, onLoginUser, onUerLogOut, addToWishList, addToCart, removeFromWishlist, removeFromCart, setCartQuantity, updateCheckoutInfo } = userSlice.actions

export default userSlice.reducer