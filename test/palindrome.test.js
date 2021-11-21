const {palindrome} = require('../utils/for_testing')

test('palindrome of Vanessa', ()=>{
    const result = palindrome('Vanessa')
    expect(result).toBe('assenaV')
})

test('palindrome of undefined', ()=>{
    const result = palindrome()
    expect(result).toBeUndefined()
})