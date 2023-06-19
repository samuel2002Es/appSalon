const options = {
    style: 'currency',
    currency: 'USD'
}
export const formatCurrrency = price => {
    Number(price).toLocaleString('en-US',options)
}