import React from "react";

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg shadow-lg p-8 mb-10 text-white">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to the Blockchain Explorer
        </h1>
        <p className="text-xl opacity-90 mb-6">
          An educational tool to understand blockchain technology
        </p>
        <div className=" bg-white/30  text-white p-4 rounded-md backdrop-blur-sm">
          <p className="text-lg">
            This interactive simulation helps you visualize how blockchain
            works. Create transactions, mine blocks, and see how the blockchain
            grows with each new block.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
