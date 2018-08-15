# sentiment
### AFINN-based sentiment analysis for Node.js

Forked from Sentiment by thisandagain
https://github.com/thisandagain/sentiment

## Added Feature
1. Custom tokenization

You can add a custom function for creating tokens by adding customLabels and customTokenization in registerLanguage method

```js
const Sentiment = require('./lib/index')
const sentiment = new Sentiment()
// require the custom tokenizetion function
const customFunction = require('./custom-tokenization') 

const idLanguage = {
  labels: {
     'berhasil': 3
     },
  customLabels: {
    "kasih sayang": 2
    "bertepuk tangan": 2
  },
  customTokenization: customFunction
};
sentiment.registerLanguage('id', idLanguage)

const analyzeOptions = {
  language: 'id'
}
const text = 'saat saya berhasil mengutarakan rasa kasih sayang ke dia, semua orang bertepuk tangan'
const result = sentiment.analyze(text, analyzeOptions)
console.dir(result)
```

The result will be:
```javascript
{ score: 7,
  comparative: 0.6363636363636364,
  tokens:
   [ 'saat',
     'saya',
     'berhasil',
     'mengutarakan',
     'rasa',
     'kasih sayang',
     'ke',
     'dia',
     'semua',
     'orang',
     'bertepuk tangan' ],
  words: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
  positive: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
  negative: [] }
```