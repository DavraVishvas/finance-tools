"use client";

import React, { useEffect, useState } from "react";


export default function LogsDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/get-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error("Failed to fetch logs", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 3000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400";
    if (status >= 300 && status < 400) return "text-blue-400";
    if (status >= 400 && status < 500) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              Traffic & Bot Detection Logs
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Real-time analysis of incoming traffic</p>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500"
              />
              Auto-refresh (3s)
            </label>
            <button 
              onClick={fetchLogs}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-sm transition-colors"
            >
              Refresh Now
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-500">
            Loading logs from system...
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 text-center text-zinc-500">
            No logs found in bot_logs.json yet.
          </div>
        ) : (
          <div className="space-y-6">
            {logs.map((log, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                
                <div className="flex justify-between items-start mb-4 border-b border-zinc-800/50 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">{log.ip}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-400 text-sm">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short', day: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3,
                        hour12: false
                      }).format(new Date(log.timestamp))}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={getStatusColor(log.statusCode)}>HTTP {log.statusCode}</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded text-xs">{log.method || 'GET'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="text-zinc-500 block text-xs mb-1">URL</span>
                    <span className="text-zinc-200 break-all">{log.url}</span>
                  </div>
                  
                  <div>
                    <span className="text-zinc-500 block text-xs mb-1">Session ID</span>
                    <span className="text-zinc-300 truncate block" title={log.sessionId}>{log.sessionId}</span>
                  </div>
                  
                  <div className="col-span-1 lg:col-span-2">
                    <span className="text-zinc-500 block text-xs mb-1">User-Agent</span>
                    <span className="text-zinc-400 text-xs break-all">{log.userAgent}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-xs mb-1">Referer</span>
                    <span className="text-zinc-400 text-xs truncate block" title={log.referer}>{log.referer}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-zinc-500 block text-xs mb-1">Activity Metrics</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-zinc-500">Freq:</span> <span className={log.requestFrequency > 60 ? "text-red-400 font-bold" : "text-white"}>{log.requestFrequency} req/min</span></div>
                      <div><span className="text-zinc-500">Duration:</span> <span className="text-white">{log.sessionDuration}s</span></div>
                      <div><span className="text-zinc-500">Pages:</span> <span className="text-white">{log.pagesPerSession}</span></div>
                      <div><span className="text-zinc-500">Repeated:</span> <span className={log.repeatedUrlSeq > 10 ? "text-red-400 font-bold" : "text-white"}>{log.repeatedUrlSeq}</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-zinc-500 block text-xs mb-1">Security & Fingerprint</span>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div><span className="text-zinc-500">JS/Cookies:</span> <span className={log.cookieAcceptance === 'Yes' ? 'text-green-400' : 'text-red-400'}>{log.cookieAcceptance}</span></div>
                      <div><span className="text-zinc-500">Geo:</span> <span className="text-white">{log.geoConsistency}</span></div>
                      <div><span className="text-zinc-500">ASN/DNS:</span> <span className="text-white">{log.asnReverseDns}</span></div>
                      <div><span className="text-zinc-500">Multi-acc:</span> <span className="text-white">{log.multipleAccounts}</span></div>
                    </div>
                  </div>

                  <div className="col-span-1 lg:col-span-3 mt-2">
                    <span className="text-zinc-500 block text-xs mb-1">Bot Detection Flags / Behavior</span>
                    <div className="bg-zinc-950 p-2 text-xs text-yellow-500 rounded border border-zinc-800">
                      [{log.robotsBehavior}] 
                      {log.requestFrequency > 100 && ' ⚠️ HIGH REQUEST RATE'}
                      {log.repeatedUrlSeq > 20 && ' ⚠️ REPEATED URLS'}
                      {log.cookieAcceptance === 'No' && ' ⚠️ NO COOKIES'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

