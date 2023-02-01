import { add } from './a';
const array = [1, 2, 5, '33'].map(i => {
  if (typeof i === 'number') {
    console.log(add(i, 2))
    return i
  }
})

console.log(array)