/**
 * Health check endpoint for monitoring API service availability and LTA connection.
 * Compatible with Vercel Serverless Functions and Node.js environments.
 */

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY || 'I+wcQDjORQOo8uJgJEVjFw==';
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const shouldTestLta = url.searchParams.get('testLta') === 'true' || req.query?.testLta === 'true';

  const healthData = {
    status: 'ok',
    service: 'SBS Transit & LTA Bus Arrival API Gateway',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    ltaKeyConfigured: Boolean(process.env.LTA_ACCOUNT_KEY || 'I+wcQDjORQOo8uJgJEVjFw=='),
  };

  if (shouldTestLta) {
    try {
      const startTime = Date.now();
      const testRes = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121&ServiceNo=7',
        {
          headers: {
            AccountKey: accountKey,
            accept: 'application/json',
          },
        }
      );

      const latencyMs = Date.now() - startTime;
      healthData.ltaProbe = {
        httpStatus: testRes.status,
        reachable: testRes.ok,
        latencyMs,
      };
    } catch (err) {
      healthData.ltaProbe = {
        reachable: false,
        error: err.message,
      };
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).json(healthData);
}
