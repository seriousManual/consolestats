# CONSOLESTATS [![Build Status](https://travis-ci.org/seriousManual/consolestats.png)](https://travis-ci.org/seriousManual/consolestats)

ConsoleStats is a small library that aggregates certain named events a creates statistic which is printed to the console.

## Installation
````
npm install consolestats
````

## Usage

````javascript
var ConsoleStats = require('consolestats')

var myStats = new ConsoleStats(1000) //1000 is the overall expected number of events

setInterval(() => myStats.push('foo'), 100)
setInterval(() => myStats.push('bar'), 200)

//prints: foo: 70(66.67%), bar: 35(33.33%), overall: 105(10.50%) of 1,000, 7.84#/s, 127.59ms/item (2 minutes left)
````

# License
The MIT License (MIT)

Copyright (c) 2016 Manuel Ernst

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.