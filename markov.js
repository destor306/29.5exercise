/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    
    for (let i=0;i<this.words.length;i++){
        let word = this.words[i];
        let next_word = this.words[i+1] || null;
        if (chains.has(word)) chains.get(word).push(next_word);
        else chains.set(word, [next_word])
    }
    this.chains = chains;
    //console.log(this.chains);
  }

  static get_rand(arr){
    return arr[Math.floor(Math.random()* arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.get_rand(keys);
    let result=[];
    
    while (result.length<numWords && key !== null){
      result.push(key);
      key = MarkovMachine.get_rand(this.chains.get(key));
    }
  return result.join(' ');

  }
}
module.exports = {MarkovMachine}