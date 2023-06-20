const options = {
    style: 'currency',
    currency: 'USD'
}
export const formatCurrrency = price => {
    return Number(price).toLocaleString('en-US',options)
}

export const prueba = (price) => {
    return price
}