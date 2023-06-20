const options = {
    style: 'currency',
    currency: 'USD'
}
export const formatCurrrency = price => {
    return Number(price).toLocaleString('en-US',options)
}
