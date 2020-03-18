module.exports = function(playerAction) {
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
    return -1
  }
  else {
    console.log('你输了!')
    return 1
  }
}