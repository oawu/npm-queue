/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2022, @oawu/queue
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = function(...params) {
  if (!(this instanceof Queue)) {
    return new Queue(...params)
  }

  this.closures = []
  this.params = params
  this.isWorking = false
}

Queue.prototype = {
  ...Queue.prototype, 

  enqueue (closure, ...args) {
    this.closures.push({ closure, args})
    setTimeout(this.dequeue.bind(this))
    return this
  },
  dequeue () {
    if (this.isWorking) {
      return this;
    }

    this.isWorking = true

    if (!this.closures.length) {
      this.isWorking = false
      return this;
    }

    const { closure, args } = this.closures[0]
    const next = (...params) => {
      this.params = params
      this.isWorking = false
      this.closures.shift()
      this.dequeue()
    }
    next.params = [...args, ...this.params]
    closure(next, ...args, ...this.params)

    return this
  },
  push (closure) {
    return this.enqueue(closure)
  },
  pop (...params) {
    return this.dequeue(...params)
  },
  clean () {
    this.closures = []
    this.params = []
    this.isWorking = false
  }
}

Queue.create = function(...closures) {
  return new Queue(...closures)
}

let main = null

Object.defineProperty(Queue, 'main', {
  get: _ => main || (main = new Queue()) })

Object.defineProperty(Queue.prototype, 'size', {
  get () { return this.closures.length } })

module.exports = Queue
