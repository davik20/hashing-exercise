const web3 = require("./getWeb3");
const Block = require("./Block");
const { blockHash } = require("./utils");

const BlockChain = [];

let poem =
  "A short poem may be a stylistic choice or it may be that you have said what you intended to say in a more concise way. Either way, they differ stylistically from a long poem in that there tends to be more care in word choice. Since there are fewer words people tend to spend more time on choosing a word that fits the subject to perfection. Because of this meticulous attitude, writing a short poem is often more tedious than writing a long poem";
poem = poem.split(".");

const genesisBlock = {
  index: 0,
  prevHash: "",
  hash: "000000",
  timestamp: Date.now(),
};
// Adding Genesis block to block chain
BlockChain.push(genesisBlock);

let index = 1;

function createBlock(data, index, BlockChain) {
  return new Block(data, index, BlockChain);
}

function createBlockChain() {
  poem.forEach((item) => {
    BlockChain.push(createBlock(item, index, BlockChain));
    index++;
  });
}

createBlockChain();

function verifyChain() {
  const bool = [];
  BlockChain.forEach((block) => {
    if (block.index !== 0) {
      const result = verifyBlock(block);
      bool.push(result[0]);
      console.log(result);
    }
  });

  if (bool.includes(false)) {
    console.log(bool);
    console.log("validation failed");
  } else {
    console.log("Chain verified");
  }
}

verifyChain();

function verifyBlock(block) {
  if (block.data === "") return [false, "data is empty " + block.index];
  if (block.index === 0 && block.hash !== "000000")
    return [false, "block hash of genesis is not 000000 " + block.index];
  if (block.prevHash === "")
    return [false, "block prev hash is empty at index " + block.index];
  if (block.index < 0) return [false, "Index is below zero " + block.index];
  if (blockHash(block) !== block.hash)
    return [false, "Calculated hash is not equal to existing " + block.index];

  return [true, "Block validated"];
  // check if calculating the block hash again is equal to the stored block hash
}
