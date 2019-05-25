Array.prototype.first = function() {
  return this[0]
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

Array.prototype.rnd = function(len, rangeL, rangeR) {
  rangeL = rangeL === undefined ? 0 : rangeL
  rangeR = rangeR === undefined ? len : rangeR

  return new Array(len).fill().map(_ => rand(rangeL, rangeR))
}

Array.prototype.min = function() {
  return Math.min.apply(null, this)
}

Array.prototype.max = function() {
  return Math.max.apply(null, this)
}

Array.prototype.swap = function(a, b) {
  const t = this[a]
  this[a] = this[b]
  this[b] = t
  return this
}

Array.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this))
}

function rand(m, n) {
  return Math.floor(Math.random() * (n - m + 1) + m)
}

function randColor(a) {
  const o = {
    r: rand(0, 255),
    g: rand(0, 255),
    b: rand(0, 255),
    a: a === undefined ? 1 : a,
  }

  o.toString = function() {
    return 'rgba(' + o.r + ',' + o.g + ',' + o.b + ',' + o.a + ')'
  }

  return o
}

const color = {
  blue: '#09f',
  lightBlue: '#0df',
  purple: '#c0f',
  orange: '#fa9f0f',
  green: '#0c0',
  red: '#c30',
  text: '#456',
  def: '#aaa',
}
