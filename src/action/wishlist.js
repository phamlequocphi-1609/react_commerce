export const IncreaseWishlist = (tongWishlist) => {
    return {
        type: "INCREASE_WISHLIST",
        payload: tongWishlist
    }
}
export const DeleteWishlist = (tongWishlist) => {
    return {
        type: "DELETE_WISHLIST",
        payload: tongWishlist
    }
}