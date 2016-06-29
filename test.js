var expect = require('chai').expect
var sinon = require('sinon')

var ConsoleStats = require('./ConsoleStats')

process.on('uncaughtException', e => console.log(e))

describe('consoleStats', () => {
    describe('consoleStats /w overall number', () => {
        var clock, list = []

        before(() => {
            clock = sinon.useFakeTimers()

            var cs = new ConsoleStats(15, text => list.push(text))

            cs.push('foo')
            cs.push('foo')
            cs.push('foo', 10)

            clock.tick(1000)

            cs.push('bar')
            cs.push('foo')

            clock.tick(1000)

            cs.push('foo')

            clock.tick(1000)
        })
        after(() => clock.restore())

        it('should', () => expect(list).to.deep.equal([
            'foo: 12(100.00%), overall: 12(80.00%) of 15, 1.20#/s, 833.33ms/item (a few seconds left)\r',
            'foo: 13(92.86%), bar: 1(7.14%), overall: 14(93.33%) of 15, 1.28#/s, 781.25ms/item (a few seconds left)\r',
            'foo: 14(93.33%), bar: 1(6.67%), overall: 15(100.00%) of 15, 1.25#/s, 798.72ms/item (a few seconds left)\r'
        ]))
    })

    describe('consoleStats /wo overall Number', () => {
        var clock, list = []

        before(() => {
            clock = sinon.useFakeTimers()

            var cs = new ConsoleStats(null, text => list.push(text))

            cs.push('foo')
            cs.push('foo')
            cs.push('foo', 10)

            clock.tick(1000)

            cs.push('bar')
            cs.push('foo')

            clock.tick(1000)

            cs.push('foo')

            clock.tick(1000)
        })
        after(() => clock.restore())

        it('should', () => expect(list).to.deep.equal([
            'foo: 12(100.00%), overall: 12, 1.20#/s, 833.33ms/item \r',
            'foo: 13(92.86%), bar: 1(7.14%), overall: 14, 1.28#/s, 781.25ms/item \r',
            'foo: 14(93.33%), bar: 1(6.67%), overall: 15, 1.25#/s, 798.72ms/item \r'
        ]))
    })
})