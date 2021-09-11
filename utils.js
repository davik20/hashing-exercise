const web3 = require("./getWeb3");

function blockHash(block) {
  const hash = web3.utils.keccak256(
    `${block.index} ${block.prevHash} ${block.data} ${block.timestamp}`
  );
  return hash;
}

module.exports = {
  blockHash,
};
