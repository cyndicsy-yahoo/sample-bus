import React, { useState, useEffect } from 'react';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStopCode: string;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({
  isOpen,
  onClose,
  currentStopCode,
}) => {
  const [healthData, setHealthData] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testEndpoint, setTestEndpoint] = useState<string>(
    `/api/bus-arrival?BusStopCode=${currentStopCode || '83139'}`
  );

  const fetchHealth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthData(data);
    } catch (err: any) {
      setHealthData({ status: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const runTestQuery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(testEndpoint);
      const data = await res.json();
      setTestResult({
        status: res.status,
        dataSource: res.headers.get('x-data-source') || 'standard',
        data,
      });
    } catch (err: any) {
      setTestResult({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f2f4f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">API Health &amp; Endpoints Monitor</h2>
              <p className="text-[11px] text-[#475569]">Monitor /api/health and LTA DataMall v3 integration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 text-xs">
          {/* Health Summary Card */}
          <div className="bg-[#f2f4f6] p-3.5 rounded-xl border border-[#e0e3e5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#475569] font-medium">Server Health:</span>
              <span className="font-bold text-[#10B981] bg-white px-2 py-0.5 rounded border border-[#E2E8F0] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                {healthData?.status === 'healthy' ? '200 OK • Healthy' : 'Checking...'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#475569] font-medium">LTA_ACCOUNT_KEY:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  healthData?.lta_account_key_configured
                    ? 'bg-[#10B981]/15 text-[#10B981]'
                    : 'bg-[#F59E0B]/20 text-[#D97706]'
                }`}
              >
                {healthData?.lta_account_key_configured
                  ? 'Configured in Vercel / Env'
                  : 'Pending (Ready for Vercel Env)'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#475569] font-medium">Target LTA Endpoint:</span>
              <span className="font-mono text-[10px] text-[#3B1C54] truncate max-w-[240px]">
                https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#475569] font-medium">Local / Vercel Endpoints:</span>
              <span className="font-mono text-[11px] text-[#5c2d91] font-semibold">
                /api/health • /api/bus-arrival
              </span>
            </div>
          </div>

          {/* Health JSON Viewer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#475569] uppercase tracking-wider text-[11px]">
                GET /api/health Response
              </span>
              <button
                onClick={fetchHealth}
                className="text-[#5c2d91] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span className={`material-symbols-outlined text-[14px] ${isLoading ? 'animate-spin' : ''}`}>
                  sync
                </span>
                Re-check
              </button>
            </div>
            <pre className="bg-[#0F172A] text-emerald-400 p-3 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed border border-[#334155]">
              {healthData ? JSON.stringify(healthData, null, 2) : 'Loading /api/health...'}
            </pre>
          </div>

          {/* Test Live Query Section */}
          <div className="pt-2 border-t border-[#f2f4f6]">
            <span className="block font-bold text-[#475569] uppercase tracking-wider text-[11px] mb-1.5">
              Live Endpoint Test Runner
            </span>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={testEndpoint}
                onChange={(e) => setTestEndpoint(e.target.value)}
                placeholder="/api/bus-arrival?BusStopCode=83139&ServiceNo=15"
                className="flex-1 h-9 px-3 text-xs bg-[#f2f4f6] rounded-lg border border-[#e0e3e5] font-mono focus:outline-none focus:ring-1 focus:ring-[#5c2d91]"
              />
              <button
                type="button"
                onClick={runTestQuery}
                className="h-9 px-4 bg-[#5c2d91] hover:bg-[#3B1C54] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {isLoading ? 'Running...' : 'Run Test'}
              </button>
            </div>

            {testResult && (
              <pre className="bg-[#0F172A] text-sky-300 p-3 rounded-lg overflow-x-auto text-[11px] font-mono max-h-48 border border-[#334155]">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#f2f4f6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#0F172A] text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
