const palindrome = (string) =>{
    if(typeof string === 'undefined')return undefined
    return string.split('').reverse().join('')
}

const average = array =>{
    if(array.length === 0) return 0
    let sum = 0
    let hasString = false
    array.forEach(num => {
    if(typeof num === 'string' ) {
        hasString=true
        array.length=0; return}
        sum += num}
    )
    if(hasString){
        return "it's no posible with string"} else{
        return sum / array.length
    }
}

module.exports={
    palindrome,
    average
}