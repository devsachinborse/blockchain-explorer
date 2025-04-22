import axios from "axios";
import React, { useEffect, useState } from "react";
import { Database } from "lucide-react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import { FaEthereum } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiSolana } from "react-icons/si";

function page() {
  const [blocks, setBlocks] = useState([]);
  const [mining, setMining] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [hash, setHash] = useState("");
  const [data, setData] = useState("");
  const [difficulty, setDifficulty] = useState(3); // Default difficulty

  const apiServer = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  const fetchBlock = async () => {
    const res = await axios.get(`${apiServer}/blocks`);
    setBlocks(res.data);
  };

  const fetchDifficulty = async () => {
    const res = await axios.get(`${apiServer}/difficulty`);
    setDifficulty(res.data.difficulty);
  };

  const setNewDifficulty = async (newDifficulty) => {
    try {
      const res = await axios.post(`${apiServer}/difficulty`, {
        newDifficulty,
      });
      setDifficulty(res.data.difficulty);
    } catch (error) {
      console.error("Error setting difficulty", error);
    }
  };

  const mineBlock = async () => {
    setMining(true);
    setNonce(0);
    setHash("");

    // Send the user input (data) to the server as a query parameter
    const source = new EventSource(
      `${apiServer}/simulate-mining?message=${encodeURIComponent(data)}`
    );

    source.onmessage = (event) => {
      const { nonce, hash, done } = JSON.parse(event.data);
      setNonce(nonce);
      setHash(hash);

      if (done) {
        source.close(); // Close the EventSource when mining is done
        fetchBlock(); // Fetch the latest blockchain state (including the mined block)
        setMining(false); // Set mining state to false
      }
    };
  };

  useEffect(() => {
    fetchBlock();
    fetchDifficulty();
  }, []); // Fetch initial blocks and difficulty

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      {/* Header */}
      <Header />

      {/* BLOCKEXPLORERE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        <div className="lg:col-span-2">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <Database className="w-10 h-10 text-emerald-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">
                Blockchain Explorer
              </h1>
            </div>

            {/* BLOCKEXPLORERE */}

            {/* Transaction Control panel */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Transaction Control Panel
              </h2>

              <div className="mb-6">
                <div className="flex flex-wrap md:flex-nowrap gap-2 mb-4">
                  <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="flex-grow border border-gray-300 rounded p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter transaction data (e.g., send 2 SOL)"
                  />
                  <button
                    onClick={mineBlock}
                    className={`px-6 py-2 rounded text-white font-medium transition-colors ${
                      mining
                        ? "bg-emerald-500 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                    }`}
                    disabled={mining}
                  >
                    {mining ? "Mining..." : "Mine Block"}
                  </button>
                </div>
              </div>

              {/* DIFFICULTY CONTROL */}

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">
                  Mining Difficulty Settings
                </h3>
                <div className="flex items-center mb-2">
                  <p className="mr-2 text-gray-700">
                    Current Difficulty:{" "}
                    <span className="font-semibold text-emerald-700">
                      {difficulty}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(parseInt(e.target.value, 10))
                    }
                    className="w-20 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                  <button
                    onClick={() => setNewDifficulty(difficulty)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded font-medium"
                  >
                    Set Difficulty
                  </button>
                </div>
                <p className="text-rose-600 text-sm mt-2">
                  Note: Set to difficulty 1 for a quicker mined block.
                  Difficulty 3 or higher would take much longer to mine the
                  block.
                </p>
              </div>
            </div>
            {!mining && blocks.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-blue-800 mb-2">
                  What You're Seeing
                </h3>
                <p className="text-blue-700 mb-2">
                  This is an educational simulation of how blockchain mining
                  works:
                </p>
                <ul className="list-disc pl-5 text-blue-700 text-sm">
                  <li className="mb-1">
                    Each <strong>block</strong> contains transaction data and is
                    linked to the previous block via its hash.
                  </li>
                  <li className="mb-1">
                    The <strong>mining process</strong> involves finding a hash
                    that meets the difficulty requirement (starts with a certain
                    number of zeros).
                  </li>
                  <li className="mb-1">
                    Higher <strong>difficulty</strong> means it takes more
                    computational work to mine a block.
                  </li>
                  <li className="mb-1">
                    The <strong>nonce</strong> is incremented until a valid hash
                    is found.
                  </li>
                </ul>
              </div>
            )}

            {mining && (
              <div className="border border-emerald-300 rounded-lg p-6 mb-8 bg-emerald-50 shadow-md">
                <div className="flex items-center mb-3">
                  <div className="animate-pulse h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                  <h3 className="font-semibold text-emerald-800 text-lg">
                    Mining in progress
                  </h3>
                </div>

                <div className="text-left mt-2 bg-white bg-opacity-60 p-4 rounded-md">
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Nonce:</span>
                    <span className="ml-2 text-emerald-700 font-mono">
                      {nonce}
                    </span>
                  </div>
                  <div className="break-all">
                    <span className="font-medium text-gray-700">Hash:</span>
                    <span className="ml-2 text-emerald-700 font-mono text-sm">
                      {hash}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-emerald-600">
                  The mining algorithm is trying different nonce values until it
                  finds a hash that meets the difficulty requirement.
                </div>
              </div>
            )}

            {/* Blockchain display */}
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Blockchain
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {blocks.map((block) => (
                <div className="border border-emerald-200 rounded-lg overflow-hidden transition-all bg-white shadow-md hover:shadow-lg">
                  {/* Block header */}
                  <div className="bg-emerald-600 text-white p-3 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Block #{block.id}</h3>
                    <div className="text-xs bg-emerald-700 rounded-full px-2 py-1">
                      Nonce: {block.nonce}
                    </div>
                  </div>

                  {/* Block content */}
                  <div className="p-4 bg-gradient-to-b from-emerald-50 to-white">
                    <div className="grid grid-cols-3 gap-2 text-xs text-emerald-800 mb-3">
                      <div className="bg-emerald-100 rounded p-1 text-center">
                        Block
                      </div>
                      <div className="bg-emerald-100 rounded p-1 text-center">
                        #{block.id}
                      </div>
                      <div className="bg-emerald-100 rounded p-1 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                        {block.timestamp.split("T")[0]}
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">TIMESTAMP</div>
                        <div className="font-mono text-gray-700">
                          {block.timestamp}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">HASH</div>
                        <div className="font-mono text-xs break-all bg-gray-50 p-1 rounded border border-gray-100">
                          {block.hash}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">PREV HASH</div>
                        <div className="font-mono text-xs break-all bg-gray-50 p-1 rounded border border-gray-100">
                          {block.previousHash}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">DATA</div>
                        <div className="bg-blue-50 border border-blue-100 rounded p-2 font-medium text-blue-800">
                          "{block.data}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <Content />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Additional Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://bitcoin.org/bitcoin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600  hover:text-blue-800"
                >
                  <div className="bg-blue-100 text-xl p-1.5  rounded-full mr-2">
                    <IoDocumentTextOutline />
                  </div>
                  Bitcoin Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="https://ethereum.org/en/developers/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <div className="bg-blue-100 rounded-full p-1.5 mr-2">
                    <FaEthereum />
                  </div>
                  Ethereum Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://solana.com/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <div className="bg-blue-100 rounded-full p-1.5 mr-2">
                    <SiSolana />
                  </div>
                  Solana Developer Resources
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
