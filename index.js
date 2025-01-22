/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2025, @oawu/queue
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


Queue.Dispatch = function(limit, closures = []) {
  if (!(this instanceof Queue.Dispatch)) {
    return new Queue.Dispatch(limit, closures)
  }
  this.closures = closures
  this.limit = limit
  this._finish = null
  this.workingCount = 0
}

Queue.Dispatch.prototype = { ...Queue.Dispatch.prototype, 
  exec (closure) {
    return this.run(closure)
  },
  run (closure) {
    this._finish = closure
    setTimeout(_ => {
      for (let i = 0; i < this.limit; i++) {
        this._dequeue()
      }
    })
    return this
  },
  enqueue (closure) {
    this.closures.push(closure)
    return this
  },
  _dequeue () {
    if (this.closures.length == 0 && this.workingCount <= 0) {
      if (typeof this._finish == 'function') {
        this._finish()
      }

      this._finish = null
      return this
    }

    if (this.workingCount >= this.limit) {
      return this
    }

    const closure = this.closures.shift()

    if (!closure) {
      return this
    }

    this.workingCount += 1

    setTimeout(_ => closure(_ => {
      this.workingCount -= 1
      this._dequeue()
    }))

    return this
  },
  clean () {
    this.closures = []
    this.workingCount = 0
    return this
  }
}

module.exports = Queue
