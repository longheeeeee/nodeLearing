const queryString = require('querystring') // 拆分参数，传入a=a&b=b&c=c
const http = require('http')
const url = require('url') // 处理路由
const fs = require('fs') // 文件系统

const game = require('./game.js')

let playerWon = 0

let playerLast = null
let sameCount = 0

http
  .createServer(function (request, response) {
    const parseUrl = url.parse(request.url)
    console.log('parseUrl', parseUrl)
    // 处理icon
    if (parseUrl.pathname == 'favicon.ico') {
      response.writeHead(200)
      response.end()
      return
    }

    // 处理游戏逻辑
    if (parseUrl.pathname == '/game') {
      if (playerWon >= 3 || sameCount === 9) {
        response.writeHead(500)
        response.end('赢了三次！再也不跟你玩了!')
        return
      }
      
      if (sameCount >= 3) {
        response.writeHead(400)
        response.end('重复出！你作弊!')
        sameCount = 9
        return
      }
      // 获取query上面的参数
      const query = queryString.parse(parseUrl.query)
      const palyerAction = query.action
      console.log('sameCount', sameCount)
      // 重复出
      if (playerLast === palyerAction) {
        sameCount ++
      }
      else {
        playerLast = palyerAction
        sameCount = 0
        console.log('playerAction', palyerAction)
      }

      const gameRes = game(palyerAction)
      if (gameRes === 0) {
        response.end('平局！')
      }
      else if (gameRes === 1) {
        response.end('你赢了！')
        playerWon ++
      }
      else {
        response.end('你输了！')
      }
      return
    }

    // 处理网页
    if (parseUrl.pathname == '/') {
      fs.createReadStream(__dirname + '/index.html').pipe(response)
    }
  })
  .listen(3200)