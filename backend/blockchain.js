const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const str =
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce;
    return crypto.createHash("sha256").update(str).digest("hex");
  }

  mineBlock(difficulty) {
    const prefix = Array(difficulty + 1).join("0");
    while (!this.hash.startsWith(prefix)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`✅ Block ${this.index} mined! Hash: ${this.hash}`);
  }
}

class Blockchain {
  constructor(difficulty = 3) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.previousHash !== prev.hash) return false;
    }
    return true;
  }
}

module.exports = { Blockchain, Block };
