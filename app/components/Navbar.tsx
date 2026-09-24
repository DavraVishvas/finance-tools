"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DarkMode, LightMode, Menu, Close, ChevronRight } from "@mui/icons-material";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const [helpHovered, setHelpHovered] = useState(false);

    useEffect(() => {
        setMounted(true);
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setDesktopMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDarkMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors duration-300">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex flex-1 justify-start">
                    <Link href="/" className="flex items-center gap-2 group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg">
                        <div className="flex h-20 w-52 items-center justify-start transition-transform group-hover:scale-105">
                            <img src="/logo.png" alt="Finance Tools Logo - Financial Tools" className="h-full w-full object-contain" />
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-1">
                    <Link
                        href="/"
                        className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${pathname === "/"
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        All Tools
                    </Link>
                    <Link
                        href="/blog"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${pathname.startsWith("/blog")
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        Insights
                    </Link>
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                    ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-2 relative" ref={menuRef}>
                    {/* Desktop Theme Toggle */}
                    <button
                        suppressHydrationWarning
                        onClick={toggleDarkMode}
                        className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all duration-200"
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            resolvedTheme === "dark" ? (
                                <LightMode className="h-4 w-4 text-amber-500" />
                            ) : (
                                <DarkMode className="h-4 w-4 text-zinc-700" />
                            )
                        ) : (
                            <div className="h-4 w-4" />
                        )}
                    </button>

                    {/* Desktop Burger Menu */}
                    <button
                        suppressHydrationWarning
                        onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                        className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        {desktopMenuOpen ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>

                    {/* Desktop Dropdown */}
                    {desktopMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950 py-2 hidden md:block">
                            <Link href="/faq" onClick={() => setDesktopMenuOpen(false)} className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">FAQ</Link>
                            <Link href="/tools" onClick={() => setDesktopMenuOpen(false)} className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Tools List</Link>
                        </div>
                    )}

                    {/* Hamburger (mobile only) */}
                    <button
                        suppressHydrationWarning
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[500px] border-t border-zinc-200 dark:border-zinc-800" : "max-h-0"
                    }`}
            >
                <nav className="flex flex-col px-4 py-3 gap-1 bg-white dark:bg-zinc-950">
                    <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${pathname === "/"
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        All Tools
                    </Link>
                    <Link
                        href="/blog"
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${pathname.startsWith("/blog")
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        Insights
                    </Link>
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                    ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                                    : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-1" />
                    <Link
                        href="/faq"
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${pathname.startsWith("/faq")
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/tools"
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${pathname.startsWith("/tools")
                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                            : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                            }`}
                    >
                        Tools List
                    </Link>
                    <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-1" />
                    <button
                        suppressHydrationWarning
                        onClick={() => {
                            toggleDarkMode();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-all duration-150"
                    >
                        <span>Theme</span>
                        {mounted ? (
                            resolvedTheme === "dark" ? (
                                <LightMode className="h-4 w-4 text-amber-500" />
                            ) : (
                                <DarkMode className="h-4 w-4 text-zinc-700" />
                            )
                        ) : null}
                    </button>
                </nav>
            </div>
        </header>
    );
}
