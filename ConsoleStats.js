'use strict'

var util = require('util')

var moment = require('moment')
var hum = require('humanize')

var defaultWriteMethod = (text) => process.stdout.write(text)

class Stats {
    constructor (overallAmount, sinkMethod) {
        this._overall = overallAmount
        this._sinkMethod = sinkMethod || defaultWriteMethod //needed for testing

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

        var overallSectionParts = []
        overallSectionParts.push(util.format('overall: %s', hum.numberFormat(this._sumSoFar, 0)))

        if (this._overall) {
            overallSectionParts.push(util.format('(%s%%) of %s', hum.numberFormat(this._sumSoFar / this._overall * 100), hum.numberFormat(this._overall, 0)))
        }

        var avgTimeEach = 1000 / this._countRate
        overallSectionParts.push(util.format(', %s#/s, ', hum.numberFormat(this._countRate)))
        overallSectionParts.push(util.format('%dms/item ', hum.numberFormat(avgTimeEach)))

        if (this._overall) {
            var timeLeft = moment.duration((this._overall - this._sumSoFar) / this._countRate, 'seconds').humanize()
            overallSectionParts.push(util.format('(%s left)', timeLeft))
        }

        groups.push(overallSectionParts.join(''))

        this._sinkMethod(groups.join(', ') + '\r')
    }
}

module.exports = Stats