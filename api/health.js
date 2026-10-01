/**
 * API Health Check Monitor
 * Compatible with Vercel Serverless Functions and Node/Express
 */

export default async function handler(req, res) {
  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY || process.env.VITE_LTA_ACCOUNT_KEY);

  const healthData = {
    status: 'healthy',
    uptime: process.uptime ? Math.floor(process.uptime()) : null,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    lta_account_key_configured: hasLtaKey,
    lta_endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
    services: {
      bus_arrival_api: 'active',
      health_monitor: 'active',
    },
    version: '1.0.0',
  };

  if (res && typeof res.status === 'function') {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(healthData);
  }

  // Fallback for Fetch API / Web standard handlers
  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
