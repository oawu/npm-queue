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
  .enqueue(async _ => {
    console.error('enqueue 1')
    await new Promise(r => setTimeout(r, 3000))
    console.error('enqueue 1 - ok')
    results.push(1)
  })
  .enqueue(async _ => {
    console.error('enqueue 2')
    await new Promise(r => setTimeout(r, 1000))
    console.error('enqueue 2 - ok')
    results.push(2)
  })
  .enqueue(async _ => {
    console.error('enqueue 3')
    await new Promise(r => setTimeout(r, 1500))
    console.error('enqueue 3 - ok')
    results.push(3)
  })
  .enqueue(async _ => {
    console.error('enqueue 4')
    await new Promise(r => setTimeout(r, 2500))
    console.error('enqueue 4 - ok')
    results.push(4)
  })
  .enqueue(async _ => {
    console.error('enqueue 5')
    await new Promise(r => setTimeout(r, 500))
    console.error('enqueue 5 - ok')
    results.push(5)
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