const web3 = require("./getWeb3");
const { blockHash } = require("./utils");
class Block {
  index;
  prevHash;
  data;
  timestamp;
  hash;

  constructor(data, index, BlockChain) {
    this.index = index;
    this.prevHash = BlockChain[index - 1].hash;
    this.data = data;
    this.timestamp = Date.now();
    this.hash = blockHash(this);
  }
}

module.exports = Block;
