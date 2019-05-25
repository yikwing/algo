class QuickSort extends MergeSort {
  async startSort() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    async function partition(l, r) {
      for (let i = l; i <= r; i++) {
        arr[i].fromIndex = i
      }

      me.constructor.name === 'QuickSort2' && arr.swap(l, rand(l + 1, r))

      const v = arr[l].n
      let j = l

      for (let i = l + 1; i <= r; i++) {
        arr[i].fillStyle = color.orange

        if (arr[i].n < v) {
          arr[i].fillStyle = color.red
          arr.swap(i, j + 1)
          j++
        }
      }

      return new Promise((next) => {
        setTimeout(() => {
          arr.swap(l, j)
          arr[j].fillStyle = color.blue
          d.steps.push(new Array(l).fill().concat(arr.slice(l, r + 1).clone()))
          me.setPos()
          next(j)
        }, conf.timeSpace)
      })
    }

    async function quickSort(l, r) {
      if (l >= r) return

      return new Promise(async (next) => {
        const p = await partition(l, r)
        await quickSort(l, p - 1)
        await quickSort(p + 1, r)
        next()
      })
    }

    await quickSort(0, arr.length - 1)
    d.steps.push(arr.clone().map((v, idx) => {
      v.fromIndex = idx
      v.fillStyle = color.blue
      return v
    }))
    me.setPos()

    setTimeout(() => {
      d.sortFinished = true
    }, 1500)
  }
}
