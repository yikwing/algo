class MergeSort {
  constructor(d) {
    const me = this
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    this.d = d
    canvas.width = arr.length * conf.rItem * 2 + conf.spaceScene * 2
    arr.forEach((item, idx, arr) => {
      item.x = 0
      item.tx = conf.rItem * idx * 2
      item.y = 0
      item.fillStyle = color.def
      item.strokeStyle = randColor().toString()
    })
    d.steps = []
    d.steps.push(arr.clone())
    me.setPos()
  }
  async startSort() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    async function mergeSort(l, r) {
      if (l >= r) return

      const mid = l + parseInt((r - l) / 2)

      await mergeSort(l, mid)
      await mergeSort(mid + 1, r)

      return new Promise((next) => {
        const aux = new Array(r - l + 1)

        for (let i = l; i <= r; i++) {
          aux[i - l] = arr[i]
        }

        let i = l
        let j = mid + 1

        for (let k = l; k <= r; k++) {
          if (i > mid) {
            arr[k] = aux[j - l]
            arr[k].fromIndex = j
            j++
          } else if (j > r) {
            arr[k] = aux[i - l]
            arr[k].fromIndex = i
            i++
          } else if (aux[i - l].n <= aux[j - l].n) {
            arr[k] = aux[i - l]
            arr[k].fromIndex = i
            i++
          } else {
            arr[k] = aux[j - l]
            arr[k].fromIndex = j
            j++
          }
        }

        setTimeout(() => {
          const aux2 = new Array(l).fill().concat(arr.slice(l, r + 1).clone())
          const fillStyle = aux2.length === arr.length && aux2.every(v => v) ? color.blue : color.orange

          d.steps.push(aux2.clone().map((item, idx, arr) => {
            item && (item.fillStyle = fillStyle)
            return item
          }))
          me.setPos()
          next()
        }, conf.timeSpace)
      })
    }

    await mergeSort(0, arr.length - 1)
    me.setPos()

    setTimeout(() => {
      d.sortFinished = true
    }, 1500)
  }
  setPos() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    d.steps.forEach((aux, downStair, arr) => {
      aux.forEach((item, idx) => {
        if (!item) return

        if (aux === d.steps.last()) {
          let from
          let _downStair = downStair

          while (!from && _downStair > 0) {
            from = d.steps[--_downStair][item.fromIndex]
          }

          if (from) {
            item.x = from.tx
            item.y = from.ty
          }
        }

        item.tx = parseInt((idx) * conf.rItem * 2)
        item.ty = parseInt(downStair * 36)
      })
    })

    canvas.height = d.steps.length * 36 + conf.spaceScene
    canvas.style.height = canvas.height + 'px'
    me.nextFrame()
  }
  nextFrame() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    d.steps.forEach((aux, downStair) => {
      aux.forEach((item, idx, arr) => {
        if (!item) return

        let vx = (item.tx - item.x) / 10
        let vy = (item.ty - item.y) / 10

        vx = vx > 0 ? Math.ceil(vx) : Math.floor(vx)
        vy = vy > 0 ? Math.ceil(vy) : Math.floor(vy)

        item.x += vx
        item.y += vy
      })
    })

    me.render()
  }
  startAni() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    function loop() {
      requestAnimationFrame(() => {
        me.nextFrame()
        d.sortFinished ? console.warn('stoped ' + me.constructor.name) : loop()
      })
    }
    loop()
  }
  render() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, gd, arr} = d
    const {conf} = algo.d

    gd.clearRect(0, 0, canvas.width, canvas.height)
    // gd.fillStyle = '#fff'
    // gd.fillRect(0, 0, canvas.width, canvas.height)
    gd.save()
    gd.translate(conf.spaceScene + conf.rItem, conf.spaceScene + conf.rItem)
    /*d.steps.forEach((aux, downStair) => {
      const lt = d.steps[0].first()
      const rt = d.steps[0].last()

      downStair > 0 && aux.forEach((item, idx, arr) => {
        let lb
        let rb
        
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]) {
            lb = arr[i]
            break
          }
        }

        for (let i = arr.length - 1; i > -1; i--) {
          if (arr[i]) {
            rb = arr[i]
            break
          }
        }

        gd.beginPath()
        gd.rect(lb.x, 0, rb.x - lb.x, lb.y)
        gd.fillStyle = 'rgba(0,170,255,.01)'
        gd.fill()
      })
    })*/
    // 画线
    d.steps.forEach((aux, downStair) => {
      downStair > 0 && aux.forEach((item, idx) => {
        if (!item) return

        const to = item
        let from
        let _downStair = downStair
        
        while (!from) {
          from = d.steps[--_downStair][to.fromIndex]
        }

        gd.beginPath()
        gd.lineTo(to.x, to.y)
        gd.lineTo(from.x, from.y)
        gd.strokeStyle = from.strokeStyle
        gd.stroke()
      })
    })
    d.steps.forEach((aux, downStair) => {
      aux.forEach((item, idx, _arr) => {
        if (!item) return

        gd.beginPath()
        gd.rect(item.x - conf.rItem + 1, item.y - conf.rItem / 2 - 3, conf.rItem * 2 - 2, conf.rItem + 4)
        gd.fillStyle = item.fillStyle
        gd.fill()

        gd.beginPath()
        gd.fillStyle = '#fff'
        gd.font = '13px Arial'
        gd.textAlign = 'center'
        gd.textBaseline = 'middle'
        // gd.fillText(item.n + (item.fromIndex === undefined ? '' : '-' + item.fromIndex), item.x, item.y)
        gd.fillText(item.n, item.x, item.y)
      })
    })
    gd.restore()
  }
}
