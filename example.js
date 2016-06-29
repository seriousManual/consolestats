var ConsoleStats = require('./ConsoleStats')

var myStats = new ConsoleStats(1000) //1000 is the overall expected number of events

setInterval(() => myStats.push('foo'), 100)
setInterval(() => myStats.push('bar'), 200)