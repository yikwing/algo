{
  const algoListEl = document.querySelector('#algo-el > .list')

  class Algo {
    constructor() {
      const d = {}
      this.d = d

      d.conf = {
        type: {
          list: [
            /*{name: '选择排序（完全随机）', cons: SelectionSort},
            // {name: '选择排序（几乎有序）', cons: SelectionSort},
            // {name: '选择排序（大量重复元素）', cons: SelectionSort},

            {name: '插入排序（完全随机）', cons: InsertionSort},
            // {name: '插入排序（几乎有序）', cons: InsertionSort},
            // {name: '插入排序（大量重复元素）', cons: InsertionSort},*/

            {name: '归并排序（完全随机）', cons: MergeSort},
            {name: '归并排序（几乎有序）', cons: MergeSort},
            {name: '归并排序（大量重复元素）', cons: MergeSort},

            {name: '快速排序（完全随机）', cons: QuickSort},
            {name: '快速排序（几乎有序）', cons: QuickSort},
            {name: '快速排序（大量重复元素）', cons: QuickSort},

            {name: '快速排序-随机优化（完全随机）', cons: QuickSort2},
            {name: '快速排序-随机优化（几乎有序）', cons: QuickSort2},
            {name: '快速排序-随机优化（大量重复元素）', cons: QuickSort2},

            {name: '双路快排（完全随机）', cons: QuickSortTwoWays},
            {name: '双路快排（几乎有序）', cons: QuickSortTwoWays},
            {name: '双路快排（大量重复元素）', cons: QuickSortTwoWays},

            {name: '三路快排（完全随机）', cons: QuickSortThreeWays},
            {name: '三路快排（几乎有序）', cons: QuickSortThreeWays},
            {name: '三路快排（大量重复元素）', cons: QuickSortThreeWays},
          ]
        },
        rItem: 14,
        widthItem: 11,
        heightItem: 260,
        spaceItem: 6,
        spaceScene: 15,
        timeSpace: 800,
      }

      d.obj = {
        list: []
      }

      algoListEl.innerHTML = d.conf.type.list.map((v) => {
        return `
          <section>
            <div class="box-start-control">
              <span class="btn btn-start">${v.name}</span>
            </div>
            <div class="box-canvas">
              <canvas title="${v.name}"></canvas>
            </div>
          </section>
        `
      }).join('')

      const len = 20
      let randArr = [].rnd(len, 1, len * 5)
      let randArrNearlyOrdered = new Array(len).fill().map((_, idx) => idx + 1)
      let randArrWithManyRepeats = [].rnd(len, 1, 4)
      
      for (let i = 0; i < 3; i++) {
        randArrNearlyOrdered.swap(rand(0, len - 1), rand(0, len - 1))
      }

      ;[].slice.call(document.querySelectorAll('#algo-el > .list .btn-start')).forEach((btnStart, idx, btns) => {
        const canvas = btnStart.closest('section').querySelector('canvas')
        const typeO = d.conf.type.list[idx]
        let arr = []

        if (typeO.name.indexOf('完全随机') > -1) arr = randArr
        if (typeO.name.indexOf('几乎有序') > -1) arr = randArrNearlyOrdered
        if (typeO.name.indexOf('大量重复元素') > -1) arr = randArrWithManyRepeats

        const o  = new typeO.cons({
          algo: this,
          btnStart: btnStart,
          canvas,
          gd: canvas.getContext('2d'),
          iMax: arr.max(),
          arr: arr.map((n) => {
            return {
              n,
              w: 0,
              h: 0,
              x: 0,
              y: 0,
              tx: 0,
              ty: 0,
              vx: 0,
              vy: 0,
              fillStyle: '',
            }
          }),
        })

        d.obj.list.push(o)
        o.startAni()

        setTimeout(() => {
          o.d.sortFinished = true
          setTimeout(() => {
            o.d.sortFinished = false

            btnStart.onclick = () => {
              btnStart.onclick = null
              o.startAni()
              o.startSort()
            }
            // btnStart.onclick()
          }, 50)
        }, 1000)
      })
    }
  }

  const algo = new Algo()

  document.onclick = function() {
    // return
    this.onclick = null
    const typeList = algo.d.conf.type.list.clone()
    const c = document.createElement('canvas')
    const gd = c.getContext('2d')
    const group = []

    const cs = [].slice.call(document.querySelectorAll('canvas'))

    while (cs.length) {
      group.push({
        maxH: 0,
        children: cs.splice(0, 3)
      })
    }

    group.forEach((item, idx, arr) => {
      item.maxH = item.children.map(v=>v.height).max() + 60
    })

    const perWidth = group[0].children[0].offsetWidth
    let posY = 0

    c.width = perWidth * 3
    c.height = group.reduce((total, item) => total += item.maxH, 0)
    gd.fillStyle = '#fff'
    gd.fillRect(0, 0, c.width, c.height)

    group.forEach((item, idxGroup, arr) => {
      item.children.forEach((c, idx, arr) => {
        gd.beginPath()
        gd.drawImage(c, idx * perWidth, posY + 40, c.offsetWidth, c.offsetHeight)

        gd.font = 'bold 20px Arial'
        gd.fontWeight = 'bold'
        gd.fillStyle = '#456'
        gd.textAlign = 'center'
        gd.textBaseline = 'middle'
        gd.fillText(c.title, idx * perWidth + perWidth / 2, posY + 30)
      })

      if (idxGroup > 0) {
        gd.beginPath()
        gd.lineTo(0, posY - .5)
        gd.lineTo(c.width, posY - .5)
        gd.strokeStyle = color.def
        gd.stroke()

        gd.beginPath()
        gd.lineTo(idxGroup * perWidth + .5, 0)
        gd.lineTo(idxGroup * perWidth + .5, c.height)
        gd.strokeStyle = color.def
        gd.stroke()
      }

      posY += item.maxH
    })

    // c.style.background = 'wheat'
    // document.body.insertBefore(c, document.body.children[0])
    // console.log(c.toDataURL())
    const img = new Image()
    img.src = c.toDataURL()
    document.body.appendChild(img)
  }
  setTimeout(() => {
    document.onclick()
  }, 4000)
}
