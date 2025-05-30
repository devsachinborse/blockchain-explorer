import React from "react";
import { Database } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";

function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-emerald-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">
            Blockchain Explorer
          </h1>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/devsachinborse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="View source on GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://x.com/dev_sachinb">
            <RiTwitterXFill className="text-gray-600 hover:text-gray-900 transition-colors text-2xl" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
