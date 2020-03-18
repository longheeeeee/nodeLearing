// 当前运行脚本位置
console.log(__filename)

// 当前运行脚本所在目录位置
console.log(__dirname)

// console.log(process)
// 进程信息
console.log(process.hrtime()) // 统计时间
console.log(process.cpuUsage()) // cpu占用率
console.log(process.resourceUSage()) // 内存占用率
console.log(process.kill) // 管理进程
console.log(process.exit)
console.log(process.env) // node运行环境的环境变量
console.log(process.argv) // 用户输入