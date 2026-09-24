"use client";

import React, { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";

export default function GlobalScrollAd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [hasClickedAd, setHasClickedAd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasTriggered && window.scrollY >= 1000) {
        setIsModalOpen(true);
        setHasTriggered(true);
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">
              Advertisement
            </span>
          </h3>
          <button
            onClick={(e) => {
              if (!hasClickedAd) {
                e.preventDefault();
                window.open(
                  "https://affectionatestorage.com/b.3oVm0UPs3_pDvJbnmbV/JhZfDm0/3UMcz/kC3LNCjQIr5lLoT/c-zHOsTact2EMFz/Mi",
                  "_blank",
                  "noopener,noreferrer"
                );
                setHasClickedAd(true);
              } else {
                setIsModalOpen(false);
                document.body.style.overflow = "";
              }
            }}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {/* Ad Content */}
        <div className="w-full h-[350px] sm:h-[400px] bg-zinc-50 dark:bg-black/50 relative flex-1 cursor-pointer flex items-center justify-center"
             onClick={(e) => {
               if (!hasClickedAd) {
                 e.preventDefault();
                 window.open(
                   "https://affectionatestorage.com/b.3oVm0UPs3_pDvJbnmbV/JhZfDm0/3UMcz/kC3LNCjQIr5lLoT/c-zHOsTact2EMFz/Mi",
                   "_blank",
                   "noopener,noreferrer"
                 );
                 setHasClickedAd(true);
               }
             }}
        >
          {/* We use an overlay div to capture clicks on the iframe if we wanted to, but the iframe intercepts its own clicks. 
              Since this is an ad script, we will load ad1.html so it displays properly, but clicks on 'Close' will trigger the direct URL */}
          <iframe
            src="/ad1.html"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Advertisement"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
          <button
            onClick={(e) => {
              if (!hasClickedAd) {
                e.preventDefault();
                window.open(
                  "https://affectionatestorage.com/b.3oVm0UPs3_pDvJbnmbV/JhZfDm0/3UMcz/kC3LNCjQIr5lLoT/c-zHOsTact2EMFz/Mi",
                  "_blank",
                  "noopener,noreferrer"
                );
                setHasClickedAd(true);
              } else {
                setIsModalOpen(false);
                document.body.style.overflow = "";
              }
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/20"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
