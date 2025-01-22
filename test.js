/**
 * @author      OA Wu <oawu.tw@gmail.com>
 * @copyright   Copyright (c) 2015 - 2025, @oawu/queue
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Queue = require('./index.js')

console.error('start');

Queue.main
  .enqueue((next, params1, params2) => {
    const start = Date.now(); while (Date.now() - start < 500); // sleep

    console.log('=> enqueue 0, params: ',
      params1.length == 3 && params1[0] == 1 && params1[1] == 2 && params1[2] == 3,
      params2 == 'a',
      next.params.length == 2 &&
        next.params[0].length == 3 &&
        next.params[0][0] == 1 &&
        next.params[0][1] == 2 &&
        next.params[0][2] == 3 &&
        next.params[1] == 'a')

    console.log('=> enqueue size: ', Queue.main.size == 4)

    setTimeout(_ => {
      const params = undefined
      console.log('=> enqueue 0 finish! params: ', params)
      console.log('')
      next()
    }, 1000)

  }, [1,2,3], 'a')

console.error('set enqueue 0');

Queue.main
  .enqueue((next, params1, params2) => {
    
    const start = Date.now(); while (Date.now() - start < 500); // sleep

    console.log('=> enqueue 1, params: ',
      params1 === undefined,
      params2 === undefined,
      next.params.length == 0)
    console.log('=> enqueue size: ', Queue.main.size == 3)

    setTimeout(_ => {
      const params = { a: 1 }
      console.log('=> enqueue 1 finish! params: ', params)
      console.log('')
      next(params)
    }, 1000)
  })
console.error('set enqueue 1');

Queue.main
  .enqueue((next, params1, params2) => {
    
    const start = Date.now(); while (Date.now() - start < 500); // sleep

    console.log('=> enqueue 2, params: ',
      params1 == 'a',
      params2.a == 1,
      next.params.length == 2
        && next.params[0] == 'a'
        && next.params[1].a == 1)
    console.log('=> enqueue size: ', Queue.main.size == 2)

    setTimeout(_ => {
      const params = { a: 2 }
      console.log('=> enqueue 2 finish! params: ', params)
      console.log('')
      next(params)
    }, 1000)    
  }, 'a')
console.error('set enqueue 2');

setTimeout(_ => {
  
  Queue.main
    .enqueue((next, params1, params2) => {
      console.log('=> enqueue 4, params: ',
        params1.a == 3,
        params2 === undefined,
        next.params.length == 1 &&
          next.params[0].a == 3)

      console.log('=> enqueue size: ', Queue.main.size == 1)

      setTimeout(_ => {
        const params = { a: 4 }
        console.log('=> enqueue 4 finish! params: ', params)
        console.log('')
        next(params)
      }, 1000)    
    })
  
  console.error('set enqueue 4');

}, 4000)

Queue.main
  .enqueue((next, params1, params2) => {
    console.log('=> enqueue 3, params: ',
      params1.a == 2,
      params2 === undefined,
      next.params.length == 1 &&
        next.params[0].a == 2)
    
    console.log('=> enqueue size: ', Queue.main.size == 2)

    setTimeout(_ => {
      const params = { a: 3 }
      console.log('=> enqueue 3 finish! params: ', params)
      console.log('')
      next(params)
    }, 1000)    
  })
console.error('set enqueue 3');

setTimeout(_ => {
  
  Queue.main
    .enqueue((next, _) => {
      console.log('=> new test')

      const queue = Queue(1,2,3)

      queue
        .enqueue((next, ...params) => {
          console.log('=> enqueue 1, params: ',
            params.length == 3 &&
              params[0] == 1 &&
              params[1] == 2 &&
              params[2] == 3,
            next.params.length == 3 &&
              next.params[0] == 1 &&
              next.params[1] == 2 &&
              next.params[2] == 3)

          console.log('=> enqueue size: ', queue.size == 3)

          setTimeout(_ => {
            const params = { a: 1 }
            console.log('=> enqueue 1 finish! params: ', params)
            console.log('')
            next(params)
          }, 1000)
        })

      queue
        .enqueue((next, ...params) => {
          console.log('=> enqueue 2, params: ',
            params.length == 1 &&
              params[0].a == 1,
            next.params.length == 1 &&
              next.params[0].a == 1)

          console.log('=> enqueue size: ', queue.size == 2)

          setTimeout(_ => {
            const params = { a: 2 }
            console.log('=> enqueue 2 finish! params: ', params)
            console.log('')
            next(params)
          }, 1000)    
        })

      setTimeout(_ => {
        
        queue
          .enqueue((next, params) => {
          console.log('=> enqueue 4, params: ',
            params.length == 1 &&
              params[0].a == 3,
            next.params.length == 1 &&
              next.params[0].a == 3)

            console.log('=> enqueue size: ', queue.size == 0)

            setTimeout(_ => {
              const params = { a: 4 }
              console.log('=> enqueue 4 finish! params: ', params)
              console.log('')
              next(params)
            }, 1000)    
          })

      }, 4000)

      queue
        .enqueue((next, ...params) => {
          
          console.log('=> enqueue 3, params: ',
            params.length == 1 &&
              params[0].a == 2,
            next.params.length == 1 &&
              next.params[0].a == 2)

          console.log('=> enqueue size: ', queue.size == 1)

          setTimeout(_ => {
            const params = { a: 3 }
            console.log('=> enqueue 3 finish! params: ', params)
            console.log('')
            next(params)
          }, 1000)    
        })
    })
  
  console.error('set enqueue 5');
}, 6000)
