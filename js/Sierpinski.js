class Sierpinski extends Fractal {
  create() {
    // console.log('Vicsek create')
  }
  render() {
    const me = this
    const d = me.d
    const {canvas, gd} = d
    const dir = {
      '0-0': 1,
      '0-1': 1,
      '0-2': 1,
      '1-0': 1,
      '1-2': 1,
      '2-0': 1,
      '2-1': 1,
      '2-2': 1,
    }
    let count = 0

    function render(x, y, w, h, depth) {
      const _w = w / 3
      const _h = h / 3

      depth++
      if (depth > d.depth) return
      count++

      gd.beginPath()
      gd.rect(x + _w, y + _h, _w, _h)
      gd.fillStyle = Node.color.purple
      gd.fill()

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (dir[i + '-' + j]) {
            render(x + j * _w, y + i * _h, _w, _h, depth)
          }
        }
      }
    }

    gd.fillStyle = Node.color.white
    gd.fillRect(0, 0, canvas.width, canvas.height)
    render(0, 0, canvas.width, canvas.height, 0)
    // console.log(me.constructor.name, count)
  }
}