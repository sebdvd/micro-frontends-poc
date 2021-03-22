/* eslint-disable no-console */
const path = require('path');
const liveServer = require('live-server');
const historyApiFallback = require('connect-history-api-fallback');
const cors = require('cors');

const setHeaders = (res, headers) => {
  for (const [header, value] of headers) {
    res.setHeader(header, value);
  }
};

const params = {
  port: 80,
  root: path.resolve(process.cwd(), 'public'),
  open: false,
  logLevel: 0,
  middleware: [
    historyApiFallback(),
    cors({ origin: 'http://dev.alkemics.com' }),
    (req, res, next) => {
      if (/\.html$/.test(req.url)) {
        let cspWhitelist = "'self' *.alkemics.com cdn.jsdelivr.net";
        for (let port = 9000; port < 9005; port += 1) {
          cspWhitelist += ` localhost:${port} ws://localhost:${port}`;
        }
        setHeaders(res, [
          [
            'Content-Security-Policy',
            `default-src ${cspWhitelist}; style-src ${cspWhitelist} 'unsafe-inline'; frame-ancestors 'self' docs.alkemics.com`,
          ],
          ['X-Frame-Options', 'SAMEORIGIN'],
          ['X-XSS-Protection', '1; mode=block'],
          ['X-Content-Type-Options', 'nosniff'],
          [
            'Strict-Transport-Security',
            'max-age=31536000; includeSubdomains; preload',
          ],
          ['Referrer-Policy', 'origin-when-cross-origin'],
          [
            'Feature-Policy',
            "camera 'none'; geolocation 'none'; microphone 'none'",
          ],
          ['Cache-Control', 'no-store'],
          ['Pragma', 'no-cache'],
          ['Expires', '0'],
        ]);
      }
      if (
        /\.(json|txt|js|css|jpg|jpeg|gif|png|svg|ico|eot|otf|woff|woff2|ttf|js\.map)$/.test(
          req.url
        )
      ) {
        setHeaders(res, [
          ['Cache-Control', 'public, max-age=2592000, immutable'],
        ]);
      }
      next();
    },
  ],
};

liveServer.start(params);
console.log('Open http://dev.alkemics.com (add host in /etc/hosts if needed)');
