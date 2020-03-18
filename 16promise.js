/*
// promise执行链
(function () {
  var promise = interview(1)
  .then(()=>{
    return interview(2)
  })
  .then(()=> {
    return interview(3)
  })
  .then(()=> {
    console.log('smile')
  })
  .catch(error => {
    console.log('cry at' + error.round + 'round')
  })

  function interview(round) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if (Math.random() > 0.2) {
          resolve('success')
        }
        else {
          var error = new Error('fail')
          error.round = round
          reject(error)
        }
      })
    }, 500)
  }
})()
*/

// promise并发控制
(function () {
  Promise
  .all([
    interview('geekbang'),
    interview('tencent')
  ])
  .then(()=> {
    console.log('smile')
  })
  .catch(error => {
    console.log('cry for ' + error.name)
  })

  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if (Math.random() > 0.2) {
          resolve('success')
        }
        else {
          var error = new Error('fail')
          error.name = name
          reject(error)
        }
      })
    }, 500)
  }
})()