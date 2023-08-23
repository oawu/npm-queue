/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2022, @oawu/queue
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = require('./index.js')

Queue.main
  .enqueue((next, params) => {
    console.log('=> enqueue 1, params: ', params, next.params)
    console.log('=> enqueue size: ', Queue.main.size)

    setTimeout(_ => {
      const params = { a: 1 }
      console.log('=> enqueue 1 finish! params: ', params)
      next(params)
    }, 1000)
  })

Queue.main
  .enqueue((next, params) => {
    console.log('=> enqueue 2, params: ', params, next.params)
    console.log('=> enqueue size: ', Queue.main.size)

    setTimeout(_ => {
      const params = { a: 2 }
      console.log('=> enqueue 2 finish! params: ', params)
      next(params)
    }, 1000)    
  })

setTimeout(_ => {
  
  Queue.main
    .enqueue((next, params) => {
      console.log('=> enqueue 4, params: ', params, next.params)

      setTimeout(_ => {
        const params = { a: 4 }
        console.log('=> enqueue 4 finish! params: ', params)
        next(params)
      }, 1000)    
    })

}, 4000)

Queue.main
  .enqueue((next, params) => {
    console.log('=> enqueue 3, params: ', params, next.params)

    setTimeout(_ => {
      const params = { a: 3 }
      console.log('=> enqueue 3 finish! params: ', params)
      next(params)
    }, 1000)    
  })

Queue.main
  .enqueue((next, _) => {
    console.log('=> new test')

    const queue = Queue(1,2,3)

    queue
      .enqueue((next, params) => {
        console.log('=> enqueue 1, params: ', params, next.params)
        console.log('=> enqueue size: ', Queue.size)

        setTimeout(_ => {
          const params = { a: 1 }
          console.log('=> enqueue 1 finish! params: ', params)
          next(params)
        }, 1000)
      })

    queue
      .enqueue((next, params) => {
        console.log('=> enqueue 2, params: ', params, next.params)
        console.log('=> enqueue size: ', Queue.size)

        setTimeout(_ => {
          const params = { a: 2 }
          console.log('=> enqueue 2 finish! params: ', params)
          next(params)
        }, 1000)    
      })

    setTimeout(_ => {
      
      queue
        .enqueue((next, params) => {
          console.log('=> enqueue 4, params: ', params, next.params)

          setTimeout(_ => {
            const params = { a: 4 }
            console.log('=> enqueue 4 finish! params: ', params)
            next(params)
          }, 1000)    
        })

    }, 4000)

    queue
      .enqueue((next, params) => {
        console.log('=> enqueue 3, params: ', params, next.params)

        setTimeout(_ => {
          const params = { a: 3 }
          console.log('=> enqueue 3 finish! params: ', params)
          next(params)
        }, 1000)    
      })


  })
