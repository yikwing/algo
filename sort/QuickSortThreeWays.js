class QuickSortThreeWays extends MergeSort {
  async startSort() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    async function quickSort(l, r) {
      if (l >= r) return

      for (let i = l; i <= r; i++) {
        arr[i].fromIndex = i
      }

      arr.swap(l, rand(l + 1, r))

      const v = arr[l].n
      let lt = l
      let gt = r + 1
      let i = l + 1

      while (i < gt) {
        if (arr[i].n < v) {
          arr[i].fillStyle = color.red
          arr.swap(i, lt + 1)
          lt++
          i++
        } else if (arr[i].n > v) {
          arr[i].fillStyle = color.orange
          arr.swap(i, gt - 1)
          gt--
        } else {
          arr[i].fillStyle = color.purple
          i++
        }
      }

      await new Promise((next) => {
        setTimeout(() => {
          arr[l].fillStyle = color.blue
          arr.swap(l, lt)
          d.steps.push(new Array(l).fill().concat(arr.slice(l, r + 1).clone()))
          me.setPos()
          next()
        }, conf.timeSpace)
      })

      return new Promise(async (next) => {
        await quickSort(l, lt - 1)
        await quickSort(gt, r)
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
