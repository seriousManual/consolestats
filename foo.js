var util = require('util')

var list = []
function hook_stdout() {
    process.stdout.write = (function(write) {
        return function(string, encoding, fd) {
            console.log(arguments);
            write.apply(process.stdout, arguments)
            list.push(string)
        }
    })(process.stdout.write)
}

console.log('a')
console.log('b')

hook_stdout()

console.log('c')
console.log('d')

console.log(list);