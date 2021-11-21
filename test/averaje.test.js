const {average}= require('../utils/for_testing')

describe('average', ()=>{
    test('of one value is the value itself', ()=>{
        expect(average([1])).toBe(1)
    })
    test('of many is calculated correctly', ()=>{
        expect(average([1,2,3,4,5,6])).toBe(3.5)
    })
    test('empty array', ()=>{
        expect(average([])).toBe(0)
    })
    test('whit string', ()=>{
        expect(average([1,2,"string"])).toBe("it's no posible with string")
    })
})