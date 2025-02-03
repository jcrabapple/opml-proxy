// functions/opml-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Only allow requests from your domain
  const allowedOrigin = 'https://cool-as-heck.blog';

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }

  try {
    const opmlUrl = 'https://www.inoreader.com/reader/subscriptions/export/user/1005679699/label/Blogroll';
    const response = await fetch(opmlUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600'
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
