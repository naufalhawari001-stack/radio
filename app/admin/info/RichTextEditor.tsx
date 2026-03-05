"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; 
import React from "react";

// --- MONKEY PATCH UNTUK REACT 19 ---
// React 19 menghapus findDOMNode, sedangkan react-quill masih mencarinya.
if (typeof window !== "undefined") {
  const ReactDOM = require("react-dom");
  if (!ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = (el: any) => el;
  }
}

// Import secara dinamis agar tidak kena "Stun" SSR di Next.js
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-100 animate-pulse rounded-[2rem]" /> 
});

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  // Konfigurasi Toolbar agar secepat fast-hand Selena
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"], 
    ],
  };

  const formats = [
    "header", "bold", "italic", "underline", "strike", "list", "bullet", "link"
  ];

  return (
    <div className="group transition-all duration-300">
      <div className="bg-white rounded-[2rem] overflow-hidden border border-emerald-100 shadow-sm group-focus-within:ring-4 group-focus-within:ring-emerald-100 group-focus-within:border-emerald-300">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="rich-text-editor"
          placeholder="Tulis kabar pondok di Purwokerto dengan mudah... [Savage!]"
        />
      </div>
      
      {/* Indikator Karakter agar antum tahu panjang artikel */}
      <div className="flex justify-between items-center mt-3 px-4">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">
          ✨ Tips: Gunakan shortcut Ctrl+B untuk menebalkan teks
        </p>
        <p className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase italic">
          {/* Menghitung teks murni tanpa tag HTML */}
          {value.replace(/<[^>]*>?/gm, '').length} Karakter
        </p>
      </div>
    </div>
  );
}