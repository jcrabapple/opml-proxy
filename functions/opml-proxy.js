// functions/opml-proxy.js
exports.handler = async function(event, context) {
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://cool-as-heck.blog',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: ''
        };
    }

    try {
        const response = await fetch('https://www.inoreader.com/reader/subscriptions/export/user/1005679699/label/Blogroll');
        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://cool-as-heck.blog',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'text/xml'
            },
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://cool-as-heck.blog'
            },
            body: JSON.stringify({ error: 'Failed fetching OPML' })
        };
    }
};
