import React from 'react';

interface LoaderProps {
    text?: string;
    fullScreen?: boolean;
}

export default function Loader({ text = "Loading...", fullScreen = false }: LoaderProps) {
    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative flex items-center justify-center h-16 w-16">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-zinc-100 dark:border-zinc-800"></div>
                {/* Inner Spinning Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                {/* Center Dot */}
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
            </div>
            {text && (
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-center py-12">
            {content}
        </div>
    );
}
