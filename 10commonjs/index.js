// console.log(process.argv)

// 使用commonjs改造石头剪刀布
let playerAction = process.argv[process.argv.length - 1]
let game = require('./lib')
game(playerAction)


// 添加多次耍赖设定
let count = 0

// 长期保持进程输入
process.stdin.on('data', e => {
  const playerAction = e.toString().trim()
  const result = game(playerAction)
  
  if (result == -1) {
    count++
  }
  if (count == 3) {
    console.log('我输了三次，我不玩了')
    process.exit()
  }
})
