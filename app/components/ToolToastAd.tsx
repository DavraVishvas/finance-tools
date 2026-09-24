"use client";

import React, { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";

export default function ToolToastAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const AD_SOURCES = ["/ad1.html"];
  const [adIndex, setAdIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const AD_DURATION = 15000; // 15 seconds
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Small delay to let the page load before sliding in the toast
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = 100;
    const step = (interval / AD_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsSliding(true);
          setTimeout(() => {
            setAdIndex((curr) => (curr + 1) % AD_SOURCES.length);
            setTimeout(() => {
              setIsSliding(false);
            }, 50);
          }, 500); // Wait for slide out to complete
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-24 right-4 sm:right-6 z-[90] w-[300px] sm:w-[320px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col animate-in slide-in-from-right-8 fade-in transition-all duration-500 ease-in-out ${isSliding ? 'translate-x-[150%] opacity-0' : 'translate-x-0 opacity-100'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Sponsored
        </span>
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
              setIsVisible(false);
            }
          }}
          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <Close className="h-4 w-4" />
        </button>
      </div>

      {/* Progress Loader */}
      <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
        <div 
          className="h-full bg-blue-500 transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ad Area */}
      <div 
        className="w-full h-[250px] bg-zinc-50 dark:bg-black/50 relative cursor-pointer flex items-center justify-center overflow-hidden"
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
        <iframe
          key={adIndex}
          src={AD_SOURCES[adIndex]}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Advertisement"
        />
      </div>

      {/* Footer / Continue Button */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-2xl">
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
              setIsVisible(false);
            }
          }}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
