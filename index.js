/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2020, Ginkgo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = function(...closures) {
  if (!(this instanceof Queue))
    return new Queue(...closures)

  this.closures = []
  this.prevs = []
  this.isWorking = false

  closures.forEach(this.enqueue.bind(this))
}

Queue.prototype = { ...Queue.prototype, 
  get size () {
    return this.closures.length
  },
  enqueue (closure) {
    this.closures.push(closure)
    this.dequeue(...this.prevs)
    return this
  },
  dequeue (...prevs) {
    if (this.isWorking) return this;
    else this.isWorking = true

    if (this.closures.length) this.closures[0]((...prevs) => (this.prevs = prevs, this.closures.shift(), this.isWorking = false, this.dequeue(...this.prevs)), ...prevs)
    else this.isWorking = false

    return this
  },
  push (closure) {
    return this.enqueue(closure)
  },
  pop (...prevs) {
    return this.dequeue(...prevs)
  },
  clean () {
    this.closures = []
    this.prevs = []
    this.isWorking = false
  }
}

Queue.create = function(...closures) {
  return new Queue(...closures)
}

module.exports = Queue
