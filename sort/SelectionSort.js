class SelectionSort {
  constructor(d) {
    const me = this
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    this.d = d
    canvas.width = arr.length * (conf.widthItem + conf.spaceItem) - conf.spaceItem + conf.spaceScene * 2
    canvas.height = conf.heightItem + conf.spaceScene * 2 + 12
    arr.forEach((item, idx, arr) => {
      item.h = item.n / d.iMax * conf.heightItem
      item.x = 0
      item.tx = (conf.widthItem + conf.spaceItem) * idx
      item.y = (conf.heightItem - item.h)
      item.fillStyle = color.def
    })
  }
  async startSort() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    for (let i = 0; i < arr.length; i++) {
      await new Promise(async (next) => {
        let minIndex = i

        arr[minIndex].fillStyle = color.purple

        for (let j = i + 1; j < arr.length; j++) {
          arr[j].fillStyle = color.def
        }

        for (let j = i + 1; j < arr.length; j++) {
          await new Promise((next) => {
            setTimeout(() => {
              arr[j].fillStyle = color.orange
              if (arr[j].n < arr[minIndex].n) {
                i !== minIndex && (arr[minIndex].fillStyle = color.orange)
                minIndex = j
                arr[minIndex].fillStyle = color.green
              }
              next()
            }, 50)
          })
        }

        setTimeout(() => {
          arr.swap(i, minIndex)
          arr[i].fillStyle = color.blue
          me.setPos()
          setTimeout(next, 1200)
        }, 600)
      })
    }

    setTimeout(() => {
      d.sortFinished = true
    }, 1000)
  }
  setPos() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    arr.forEach((item, idx, arr) => {
      item.tx = (conf.widthItem + conf.spaceItem) * idx
    })
  }
  nextFrame() {
    const me = this
    const d = me.d
    const {algo, btnStart, canvas, arr} = d
    const {conf} = algo.d

    arr.forEach((item, idx, arr) => {
      item.vx = (item.tx - item.x) / 14
      item.vx = item.vx > 0 ? Math.ceil(item.vx) : Math.floor(item.vx)
      item.x += item.vx
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
        d.sortFinished ? console.warn('stoped ' + me.constructor.name) : loop()
        me.nextFrame()
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
    gd.save()
    gd.translate(conf.spaceScene, conf.spaceScene + 12)
    arr.forEach((item, idx, arr) => {
      gd.beginPath()
      gd.rect(item.x, item.y, conf.widthItem, item.h)
      gd.fillStyle = item.fillStyle
      gd.fill()

      gd.fillStyle = color.text
      gd.font = '12px Arial'
      gd.textAlign = 'center'
      gd.textBaseline = 'bottom'
      gd.fillText(item.n, item.x + conf.widthItem / 2, item.y)
    })
    gd.restore()
  }
}