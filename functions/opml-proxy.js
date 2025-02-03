const fetch = require('node-fetch'); // You'll need to install this

exports.handler = async function(event, context) {
  // Only allow requests from your domain
  const allowedOrigin = 'https://cool-as-heck.blog';

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No content needed for preflight
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const opmlUrl = 'https://www.inoreader.com/reader/subscriptions/export/user/1005679699/label/Blogroll';
    const response = await fetch(opmlUrl);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: data
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin
      },
      body: JSON.stringify({ error: 'Failed to fetch OPML data' })
    };
  }
};
