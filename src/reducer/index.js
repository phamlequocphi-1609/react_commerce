import {combineReducers} from 'redux'
import qtyReducer from './qty'
import wishlistReducer from './wishlist'

const rootReducer = combineReducers({
    tongqty: qtyReducer,
    tongwishlist: wishlistReducer,
})
export default rootReducer