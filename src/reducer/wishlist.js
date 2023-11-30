const initialState = {
    tongWishlist: 0
}
function wishlistReducer(state = initialState, action){
    switch(action.type){
        case "INCREASE_WISHLIST":
            return{
                ...state,
                tongWishlist: action.payload
            }
        case "DELETE_WISHLIST":
            return{
                ...state,
                tongWishlist: action.payload
            }
        default:
            return state
    }
}
export default wishlistReducer

