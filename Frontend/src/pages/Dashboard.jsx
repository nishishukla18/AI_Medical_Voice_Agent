import React, { useState } from "react";
import History from '../components/History'
import SymptomsBox from "../components/SymptomsBox";

export default function Dashboard() {
  const [openBox,setOpenBox] = useState(false)
  return (
    <div className="w-full px-6 pt-28 pb-10 max-w-7xl mx-auto">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">My Dashboard</h1>

        <button onClick={()=>setOpenBox(true)} className="px-5 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-all shadow">
          + Start Consultation
        </button>
      </div>

      {/* Main Rectangle Box */}
      <div className="w-full bg-white border border-neutral-300 rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center">

        <button onClick={() => setOpenBox(true)} className="px-5 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-all shadow mb-6">
          + Start Consultation
        </button>

        <p className="text-neutral-600 text-lg">
          No consultations yet. Click the button above to begin.
        </p>

      </div>
      {openBox && <SymptomsBox onClose={()=>setOpenBox(false)}></SymptomsBox>}
      <History/>
    </div>
  );
}
