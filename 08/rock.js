// console.log(process.argv)

let playerAction = process.argv[process.argv.length - 1]

console.log(playerAction)

let random = Math.random() * 3

let computerAction

if (random < 1) {
  computerAction = 'rock'
}
else if (random > 2) {
  computerAction = 'scissor'
}
else {
  computerAction = 'paper'
}

if (computerAction === playerAction) {
  console.log('平局!')
}
else if (
  playerAction === 'rock' && computerAction === 'scissor' ||
  playerAction === 'paper' && computerAction === 'rock' || 
  playerAction === 'scissor' && computerAction === 'paper'
) {
  console.log('你赢了!')
}
else {
  console.log('你输了!')
}