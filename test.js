/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2025, @oawu/queue
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = require('./index.js')

console.error('start');

Queue({a: 1})
.enqueue(async (a, b) => {
  console.error(a == 'a', b.a == 1);
  
  await new Promise(r => setTimeout(r, 500))
  
  b.a = 2
  return b
}, 'a')
.enqueue(async (a, b) => {
  console.error(a == 'b', b.a == 2);
  await new Promise(r => setTimeout(r, 500))
  throw new Error('x')
}, 'b')
.enqueue(async (a, b) => {
  console.error(a == 'c', b.message == 'x');
}, 'c')


console.error('end');
