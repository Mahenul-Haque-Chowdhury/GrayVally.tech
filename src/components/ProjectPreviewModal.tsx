"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Tablet, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectPreviewModalProps {
  url: string | null;
  onClose: () => void;
}

export default function ProjectPreviewModal({ url, onClose }: ProjectPreviewModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#0c0c12] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-3 md:p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                <div className="hidden sm:flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/5 text-[10px] md:text-xs text-white/40 font-mono truncate max-w-[120px] sm:max-w-[200px] md:max-w-md">
                  {url}
                </div>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  title="Open in new tab"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                  <button 
                    onClick={() => setViewMode("desktop")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === "desktop" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                  >
                    <Monitor size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode("tablet")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === "tablet" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                  >
                    <Tablet size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode("mobile")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === "mobile" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 md:p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-white overflow-hidden relative flex justify-center">
              <div className={`h-full transition-all duration-500 ease-in-out shadow-2xl ${
                viewMode === "desktop" ? "w-full" : 
                viewMode === "tablet" ? "w-[768px]" : "w-[375px]"
              }`}>
                <iframe 
                  src={url} 
                  className="w-full h-full border-none"
                  title="Project Preview"
                />
              </div>
              {/* Loading State */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[#0c0c12]">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
