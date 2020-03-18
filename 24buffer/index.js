const fs = require('fs')
const protobuf = require('protocol-buffers')
const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))
console.log('schema', schema)

const buffer = schema.Column.encode({
  id: 1,
  name: 'node.js',
  price: 80.1
})

console.log('buffer', buffer)
console.log(schema.Column.decode(buffer))