const express = require("express");
const cors = require("cors");
const { Blockchain, Block } = require("./blockchain");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Create the blockchain instance
const myBlockchain = new Blockchain(3);

// Default difficulty
let difficulty = 3; // Default: 3 leading zeros
let miningInProgress = false;

// Endpoint to fetch all blocks
app.get("/blocks", (req, res) => {
  res.json(myBlockchain.chain);
});

// Endpoint to get the current difficulty
app.get("/difficulty", (req, res) => {
  res.json({ difficulty });
});

// Endpoint to set the difficulty dynamically
app.post("/difficulty", (req, res) => {
  const { newDifficulty } = req.body;
  if (typeof newDifficulty === "number" && newDifficulty >= 1) {
    difficulty = newDifficulty;
    res.json({ difficulty });
  } else {
    res.status(400).send("Invalid difficulty value");
  }
});

// Simulate mining via SSE
// Simulate mining via SSE (Server-Sent Events)
// Simulate mining via SSE
app.get("/simulate-mining", (req, res) => {
  if (miningInProgress) {
    return res.status(400).send("Mining already in progress");
  }

  miningInProgress = true;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let nonce = 0;

  // Get the data from the request (e.g., user input for block data)
  const blockData = req.query.message || "New Block"; // Fallback to "New Block" if no input

  let block = new Block(
    myBlockchain.chain.length,
    new Date().toISOString(),
    blockData, // Use dynamic user input here
    myBlockchain.getLatestBlock().hash
  );

  let miningDone = false;

  // Mining simulation (brute-force SHA256 with a dynamic difficulty)
  const mine = setInterval(() => {
    block.nonce = nonce++;
    block.hash = block.calculateHash();
    const target = "0".repeat(difficulty); // Difficulty: number of leading zeros based on dynamic difficulty
    const done = block.hash.startsWith(target);

    // Check if the block is successfully mined
    if (done && !miningDone) {
      miningDone = true;
      clearInterval(mine); // Clear the interval immediately after block is mined

      // Add the mined block to the blockchain (don't show it yet)
      myBlockchain.addBlock(block);

      // Send the mining progress to the client (don't show the block yet)
      res.write(
        `data: ${JSON.stringify({
          nonce,
          hash: block.hash,
          done,
          difficulty,
        })}\n\n`
      );

      // Close the connection after sending the final data
      res.write('data: {"done": true}\n\n');
      res.end();

      miningInProgress = false; // Reset the mining state
    } else {
      // Send progress data while still mining (don't show new block)
      res.write(
        `data: ${JSON.stringify({
          nonce,
          hash: block.hash,
          done,
          difficulty,
        })}\n\n`
      );
    }
  }, 100); // Adjust interval as needed
});

// Endpoint to mine a block (usually starts mining based on data)
app.post("/mine", (req, res) => {
  const { message } = req.body;
  const newBlock = new Block(
    myBlockchain.chain.length,
    new Date().toISOString(),
    message
  );
  myBlockchain.addBlock(newBlock);
  res.json({ message: "Block mined!", block: newBlock });
});

app.listen(port, () => {
  console.log(`Blockchain server running at http://localhost:${port}`);
});
