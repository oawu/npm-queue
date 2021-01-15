# OA's Node.js Queue

排排站吧，你們這些傢伙！

## 說明
主要是將須同步處理的事件或功能，以 Queue 的方式依序處理，或許大家會採用 Promise 的方式處理同步問題，但如果各個 Promise 是需要先後順序或者相依的參數，那可以參考本套件喔！

## 安裝

```shell
npm install @oawu/queue
```

## 使用

定義要執行的 function，依照 enqueue 進去的順序執行，當事件執行完後，呼叫 next 來執行下一個 enqueue

其執行的順序主要就是依據被 enqueue 的先後順序，如下範例則會依序執行 queue 1, queue 2, queue 3, queue 4

queue 4 在程式碼中雖然是先定義了，但因為 timeout 關係，所以會被最晚 enqueue，故會最後執行。

```javascript

  const Queue = require('@oawu/queue.js')
  const queue = new Queue()

  // define queue 1
  queue.enqueue(next => {

    setTimeout(() => { // someAsyncFunction
      next({ a: 1 }) // someAsyncFunction Finish! pass data to next queue
    }, 1000)
  })
  
  // define queue 2
  queue.enqueue((next, lastParams) => {
    console.log(lastParams) // { a: 1 }

    setTimeout(() => { // someAsyncFunction
      next({ a: 2 }) // someAsyncFunction Finish! pass data to next queue
    }, 1000)
  })

  setTimeout(() => {
    // define queue 4
    queue.enqueue((next, lastParams) => {
      console.log(lastParams) // { a: 3 }
    })
  }, 5000)
  
  setTimeout(() => {
    // define queue 3
    queue.enqueue((next, lastParams) => {
      console.log(lastParams) // { a: 2 }

      next({ a: 3 }) // someAsyncFunction Finish! pass data to next queue
    })
  }, 1000)

```


## 物件

共享，`@oawu/queue` 內有預設的共用物件，簡單或需共用的環境下可以直接使用，如下範例：

```javascript
  const Queue = require('@oawu/queue.js')
  const queue = Queue()

  queue.enqueue(next => {
    // ...
  })
```

大小，`@oawu/queue` 可以使用 `size` 取得目前剩正在執行與餘未執行的事件，如下範例：

```javascript
  const Queue = require('@oawu/queue.js')
  const queue = Queue.create()

  queue.enqueue(next => {
    console.log(queue.size)
  })
```

清空，`@oawu/queue` 可以使用 `clean` 將目前剩餘未執行的事件全部清空，並且結束執行，直到有新的事件 `enqueue`，如下範例：

```javascript
  const Queue = require('@oawu/queue.js')
  const queue = new Queue()

  queue.enqueue(next => {
    queue.clean()
  })

  queue.enqueue(next => {
    // ... 不會被執行
  })
```
