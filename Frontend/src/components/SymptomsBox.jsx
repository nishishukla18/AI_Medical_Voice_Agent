import React from "react";
import { Link } from "react-router-dom";

export default function SymptomsBox({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-neutral-900">
            Add the Issue
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-semibold text-neutral-700 hover:text-neutral-900 transition cursor-pointer"
          >
            ×
          </button>
        </div> 
        {/* Message Box */}
        <textarea
          placeholder="Describe your symptoms or issue..."
          className="w-full h-40 p-4 border border-neutral-300 rounded-xl outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-neutral-400 text-neutral-700 font-medium hover:bg-neutral-100 transition-all"
          >
            Cancel
          </button>

          <Link to='/voicecall'
            className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-all"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
