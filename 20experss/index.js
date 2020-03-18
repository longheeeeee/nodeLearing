const fs = require('fs')

const game = require('./game.js')

const express = require('express')

let playerWon = 0

let playerLast = null
let sameCount = 0

const app = express()


app.get('/favicon.ico', function (request, response) {
  response.status(200)
  response.send()
  return
})

app.get('/game',
  function(request, response, next){
    if (playerWon >= 3 || sameCount === 9) {
      response.status(500)
      response.send('再也不跟你玩了!')
      return
    }
    next()
    if (response.playerWon === true) {
      playerWon ++
    }
  },
  function (request, response, next) {

    if (sameCount >= 3) {
      response.status(400)
      response.send('你作弊!')
      sameCount = 9
      return
    }

    const query = request.query
    const playerAction = query.action
    console.log('sameCount', sameCount)
    if (playerLast === playerAction) {
      sameCount++
    }
    else {
      playerLast = playerAction
      sameCount = 0
      console.log('playerAction', playerAction)
    }
    response.playerAction = playerAction
    next()
  },
  function(request, response) {
    const playerAction = response.playerAction
    const gameRes = game(playerAction)
    if (gameRes === 0) {
      response.send('平局！')
    }
    else if (gameRes === 1) {
      response.send('你赢了！')
      response.playerWon = true
    }
    else {
      response.send('你输了！')
    }
    return
  }
)

app.get('/', function (request, response) {
  response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
  return
})

app.listen(3000)