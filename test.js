import StateMachine from './StateMachine.js'

const characterSet = 'abcde'
const numPagesPerBook = 20
const numCharsPerPage = 20

const machine = new StateMachine(characterSet, numPagesPerBook, numCharsPerPage)

// // // const [room, wall, shelf, volume] = coordinates.split("-")
// console.log(476837158203124)
// // console.log(476837158203124, '0-0-0-0' )


// const { page } = machine.search('eeeeeeeeeeeeeeeeeeee')
// console.log(page)
// const foo = machine.generatePage(page)
// console.log(foo)
// const { page2 } = machine.search(foo)
// console.log(page2)
// const foo2 = machine.generatePage(page2)
// console.log(foo2)

// 0-0-0-9 14
// aaaaaaaaaaaaaaaaeiou
// console.log(machine.generatePage(0))
// console.log(machine.generatePage('0-0-0-0', 1))
// console.log(machine.generatePage('0-0-0-0', 2))
// console.log(machine.generatePage('0-0-0-0', 3))
// console.log(machine.generatePage('0-0-0-0', 4))
// console.log(machine.generatePage('0-0-0-0', 20))

// for(let i = 790;i<=820 ;i++){
//     console.log('0-0-0-0', i)
//     const generatedPage = machine.generatePage('0-0-0-0', i)
//     const { coordinates, page } = machine.search(generatedPage)
//     console.log(coordinates, page)
//     console.log('==========')
// }



// '4768371582-0-3-1', 4 =>`. '0-0-0-0', 4768371582 031 24 => eeeeeeeeeeeeeeeeeeee // max

// let i = 476837158203124
// let generatedPage = ''


// do {
//     console.log(generatedPage)
// generatedPage = machine.generatePage('0-0-0-0', i)
// i++
// } while (generatedPage !== 'eeeeeeeeeeeeeeeeeeee');

// console.log(i)


// 95367431640624


// Number.MAX_SAFE_INTEGER; // 9007199254740991
// 33^100 => 7.102218e+151  // 7.102218e+151


// 'abcde'.length ^ 20
// 5 ^ 20
// 9.5367432e+13
// 95367431640624

// 95367431640624
// OTUzNjc0MzE2NDA2MjQ=


// 'abcde'
// abcde
// 'eeeeeeeeeeeeeeeeeeee'
// 'aaaaaaaaaaaaaaaaaaaa'

// 323228497      // approximately maximum number of decimal digits.
// https://v8.dev/features/bigint

const { page } = machine.search('aaaaaaaaaaaaaaaaaaa')
console.log(page)

const { page: page2 } =machine.search('aaaaaaaaaaaaaaaaaaaa')
console.log(page2)
const { page: page3 } =machine.search('aaaaaaaaaaaaaaaaaaab')
console.log(page3)
const { page: page4 } =machine.search('aaaaaaaaaaaaaaaaaaac')
console.log(page4)