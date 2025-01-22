/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2025, @oawu/queue
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = require('./index.js')

const dis = Queue.Dispatch(3)
const results = []
dis
  .enqueue(next => {
    console.error('enqueue 1')
    setTimeout(_ => {
      console.error('enqueue 1 - ok')
      results.push(1)
      next()
    }, 3000)
  })
  .enqueue(next => {
    console.error('enqueue 2')
    setTimeout(_ => {
      console.error('enqueue 2 - ok')
      results.push(2)
      next()
    }, 1000)
  })
  .enqueue(next => {
    console.error('enqueue 3')
    setTimeout(_ => {
      console.error('enqueue 3 - ok')
      results.push(3)
      next()
    }, 1500)
  })
  .enqueue(next => {
    console.error('enqueue 4')
    setTimeout(_ => {
      console.error('enqueue 4 - ok')
      results.push(4)
      next()
    }, 2500)
  })
  .enqueue(next => {
    console.error('enqueue 5')
    setTimeout(_ => {
      console.error('enqueue 5 - ok')
      results.push(5)
      next()
    }, 500)
  })

dis
  .exec(_ => {
    console.error('ok', results.length == 5 &&
      results[0] == 2 &&
      results[1] == 3 &&
      results[2] == 5 &&
      results[3] == 1 &&
      results[4] == 4)
  })