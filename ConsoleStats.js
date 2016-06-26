'use strict'

var util = require('util')

var moment = require('moment')
var hum = require('humanize')

var defaultWriteMethod = (text) => process.stdout.write(text)

class Stats {
    constructor (overallAmount, sinkMethod) {
        this._overall = overallAmount
        this._sinkMethod = sinkMethod || defaultWriteMethod

        this._aggregate = {}
        this._sumSoFar = 0

        this._countThisIntervall = 0
        this._countRate = 0

        setInterval(() => {
            this._calculate()
            this._print()
        }, 1000)
    }

    push (what, amount) {
        amount = amount || 1

        if (!this._aggregate[what]) this._aggregate[what] = 0

        this._aggregate[what] += amount
        this._countThisIntervall += amount
        this._sumSoFar += amount
    }

    _calculate () {
        this._countRate = 0.9 * this._countRate + 0.1 * this._countThisIntervall
        this._countThisIntervall = 0
    }

    _print () {
        var groups = Object
            .keys(this._aggregate)
            .map(key => {
                var count = this._aggregate[key]

                return util.format('%s: %s(%s%%)', key, hum.numberFormat(count, 0), hum.numberFormat(count / this._sumSoFar * 100))
            })

        var timeLeft = moment.duration((this._overall - this._sumSoFar) / this._countRate, 'seconds').humanize()
        var avgTimeEach = 1000 / this._countRate

        groups.push(util.format('overall: %s(%s%%) of %s, %s#/s, %dms/item (%s left)', hum.numberFormat(this._sumSoFar, 0), hum.numberFormat(this._sumSoFar / this._overall * 100), hum.numberFormat(this._overall, 0), hum.numberFormat(this._countRate), hum.numberFormat(avgTimeEach), timeLeft))

        this._sinkMethod(groups.join(', ') + '\r')
    }
}

module.exports = Stats