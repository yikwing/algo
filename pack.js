const fs = require('fs')
const pathArr = [
  './algo/js/Common.js',
  './algo/js/MergeSort.js',
  './algo/js/QuickSort.js',
  './algo/js/QuickSort2.js',
  './algo/js/QuickSort3.js',
  './algo/js/MaxHeap.js',
  './algo/js/SegmentTree.js',
  './algo/js/BinarySearch.js',
  './algo/js/AVLTree.js',
  './algo/js/RBTree.js',
  './algo/js/Trie.js',
  './algo/js/mazeData.js',
  './algo/js/SolveMaze.js',
  './algo/js/Algo.js',
]

let result = ''
pathArr.forEach((path, idx, arr) => {
  result += fs.readFileSync(path, 'utf-8') + '\n\n'
})

result = result + `export default Algo`

fs.writeFileSync('./src/components/algo/algoAll.js', result)