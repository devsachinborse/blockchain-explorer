import React from "react";
import { Database } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-emerald-400 mr-2" />
              <span className="font-bold">Blockchain Explorer</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              An educational tool for understanding blockchain technology
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            © devSachin {new Date().getFullYear()} Blockchain Explorer - For
            Educational Purposes Only
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
