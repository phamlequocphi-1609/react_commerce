export const IncreaseNewQty = (tongQty) => {
    return{
        type: 'INCREASE_QTY',
        payload: tongQty
    }
}
export const DecreaseNewQty = (tongQty) => {
    return{
        type: "DECREASE_QTY",
        payload: tongQty
    }
}
export const DeleteNewQty = (tongQty) => {
    return{
        type: "DELETE_QTY",
        payload: tongQty
    }
}