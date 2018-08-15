const Sentiment = require('./lib/index')
const sentiment = new Sentiment()
const idLabels = require('./labels-ind.json') // labels yang bahasa indonesia yg cuma 1 kata
const idLabelsWords = require('./labels-ind-words.json') // labels yang bahasa indonesia yg 2 kata atau lebih

const idLanguage = {
  labels: idLabels,
  labelsWords: idLabelsWords
};
sentiment.registerLanguage('id', idLanguage)

// "kasih sayang": 2
// "bertepuk tangan": 2
// "berhasil": 3
const text = 'saat saya berhasil mengutarakan rasa kasih sayang ke dia, semua orang bertepuk tangan'
const result = sentiment.analyze(text, {language: 'id'})
console.dir(result)

// UDAH BISA KLO 2 KATA

// YG DI GANTI/TAMBAHIN
// 1. ./lib/index.js di line ke 57
//  kalau bahasanya bukan bahasa inggris, manggil getCustomTokens
// 2. ./lib/language-processor di line 91
//  getCustomTokens di pakai buat edit token supaya bisa pake token 2 kata atau lebih

// { score: 7,
//   comparative: 0.6363636363636364,
//   tokens:
//    [ 'saat',
//      'saya',
//      'berhasil',
//      'mengutarakan',
//      'rasa',
//      'kasih sayang',
//      'ke',
//      'dia',
//      'semua',
//      'orang',
//      'bertepuk tangan' ],
//   words: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
//   positive: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
//   negative: [] }