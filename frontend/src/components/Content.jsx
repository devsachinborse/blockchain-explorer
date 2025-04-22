import React from "react";
import { Info } from "lucide-react";
function content() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">
          Understanding Blockchain
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">
            What is a Blockchain?
          </h3>
          <p className="text-gray-600 text-sm">
            A blockchain is a distributed digital ledger that records
            transactions across many computers. This technology ensures that
            records cannot be altered retroactively without altering all
            subsequent blocks.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Key Components</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm">
            <li className="mb-1">
              <strong>Block</strong>: A container that holds transaction data
              and metadata
            </li>
            <li className="mb-1">
              <strong>Hash</strong>: A unique cryptographic signature for each
              block
            </li>
            <li className="mb-1">
              <strong>Nonce</strong>: A number used in mining to find a valid
              block hash
            </li>
            <li className="mb-1">
              <strong>Difficulty</strong>: Determines how hard it is to find a
              valid hash
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">How Mining Works</h3>
          <ol className="list-decimal pl-5 text-gray-600 text-sm">
            <li className="mb-1">Transactions are bundled into a block</li>
            <li className="mb-1">
              Miners compete to find a valid hash by changing the nonce
            </li>
            <li className="mb-1">
              When a valid hash is found, the block is added to the chain
            </li>
            <li className="mb-1">
              Other nodes verify the block and consensus is reached
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 p-3 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-1">This Simulator</h3>
          <p className="text-blue-700 text-sm">
            This educational tool demonstrates the basic concepts of blockchain
            technology. Try changing the difficulty level and observe how it
            affects the mining process!
          </p>
        </div>
      </div>
    </div>
  );
}

export default content;
