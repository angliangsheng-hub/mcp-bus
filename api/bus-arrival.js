/**
 * LTA DataMall v3 BusArrival Serverless API Proxy
 * GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=...&ServiceNo=...
 *
 * Header: AccountKey: process.env.LTA_ACCOUNT_KEY || "I+wcQDjORQOo8uJgJEVjFw=="
 *
 * Parameters:
 * - BusStopCode: (required) 5-digit bus stop code, e.g. 04121, 64009
 * - ServiceNo: (optional) e.g. 7, 147
 */

export default async function handler(req, res) {
  // CORS configuration
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

  try {
    // Parse query params safely across Vercel / Node HTTP
    let busStopCode;
    let serviceNo;

    if (req.query) {
      busStopCode = req.query.BusStopCode || req.query.busStopCode;
      serviceNo = req.query.ServiceNo || req.query.serviceNo;
    } else {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      busStopCode = url.searchParams.get('BusStopCode') || url.searchParams.get('busStopCode');
      serviceNo = url.searchParams.get('ServiceNo') || url.searchParams.get('serviceNo');
    }

    if (!busStopCode) {
      return res.status(400).json({
        error: 'Missing required parameter: BusStopCode',
        example: '/api/bus-arrival?BusStopCode=04121&ServiceNo=7',
      });
    }

    // Clean bus stop code (must be 5 digits string, pad if needed)
    const cleanStopCode = String(busStopCode).trim().padStart(5, '0');
    const accountKey = process.env.LTA_ACCOUNT_KEY || 'I+wcQDjORQOo8uJgJEVjFw==';

    let targetUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(
      cleanStopCode
    )}`;

    if (serviceNo && String(serviceNo).trim()) {
      targetUrl += `&ServiceNo=${encodeURIComponent(String(serviceNo).trim())}`;
    }

    const ltaResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        AccountKey: accountKey,
        accept: 'application/json',
      },
    });

    if (!ltaResponse.ok) {
      const errorText = await ltaResponse.text();
      return res.status(ltaResponse.status).json({
        error: `LTA DataMall API responded with status ${ltaResponse.status}`,
        details: errorText,
      });
    }

    const data = await ltaResponse.json();

    // Cache header: LTA refreshes every 20 seconds
    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=5');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching LTA Bus Arrival:', error);
    return res.status(500).json({
      error: 'Internal server error fetching LTA bus arrivals',
      message: error.message,
    });
  }
}
