const initialState = {
    tongQty : 0
}
function qtyReducer(state = initialState, action){
    switch(action.type){
        case "INCREASE_QTY": {
            return{
                ...state,
                tongQty: action.payload
            }
        }
        case "DECREASE_QTY": {
            return{
                ...state,
                tongQty: action.payload
            }
        }
        case "DELETE_QTY": {
            return{
                ...state,
                tongQty: action.payload
            }
        }
        default:
            return state
    }
}
export default qtyReducer