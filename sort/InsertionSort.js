class InsertionSort extends SelectionSort {
  async startSort() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    for (let i = 1; i < arr.length; i++) {
      let j = i

      for (; j > 0 && arr[j].n < arr[j - 1].n; j--) {
        await new Promise((next) => {
          arr.swap(j, j - 1)
          arr[j - 1].fillStyle = color.green
          arr[j].fillStyle = color.blue
          me.setPos()
          setTimeout(next, 400)
        })
      }

      await new Promise((next) => {
        setTimeout(() => {
          arr[j].fillStyle = color.blue
          arr[j - 1] && (arr[j - 1].fillStyle = color.blue)
          next()
        }, 400)
      })
    }

    setTimeout(() => {
      d.sortFinished = true
    }, 1000)
  }
}