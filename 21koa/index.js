const fs = require('fs')
const game = require('./game.js')
const koa = require('koa')
const mount = require('koa-mount')


let playerWon = 0
let playerLast = null
let sameCount = 0

const app = new koa()

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200
  })
)

const gameKoa = new koa()
app.use(
  mount('/game', gameKoa)
)

gameKoa.use(
  async function (ctx, next) {
    if (playerWon >= 3) {
      ctx.status = 500
      ctx.body = '再也不跟你玩了!'
    }
    await next()
    if (ctx.playerWon === true) {
      playerWon++
    }
  }
)
gameKoa.use(
  async function (ctx, next) {
    const query = ctx.query
    const playerAction = query.action
    if (!playerAction) {
      ctx.status = 400
      return
    }
    if (sameCount === 9) {
      ctx.status = 500
      ctx.body = '我不会再玩了!'
    }
    if (playerLast === playerAction) {
      sameCount++
      if (sameCount >= 3) {
        ctx.status = 400
        ctx.body = '你作弊!'
        sameCount = 9
        return
      }
    }
    else {
      sameCount = 0
    }
    playerLast = playerAction
    ctx.playerAction = playerAction
    await next()
  }
)
gameKoa.use(
  async function (ctx, next) {
    const playerAction = ctx.playerAction
    const gameRes = game(playerAction)
    await new Promise(reslove => {
      setTimeout(() => {
        ctx.status = 200
        if (gameRes === 0) {
          ctx.body = '平局！'
        }
        else if (gameRes === 1) {
          ctx.body = '你赢了！'
          ctx.playerWon = true
        }
        else {
          ctx.body = '你输了！'
        }
        reslove()
      }, 500)
    })
  }
)

app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  })
)


app.listen(3000)