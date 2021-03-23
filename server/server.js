const path = require('path');
const express = require('express');
const cors = require('cors');
const historyApiFallback = require('connect-history-api-fallback');

const app = express();
const port = 80;

app.use(historyApiFallback());
app.use(
  express.static(path.resolve(process.cwd(), 'public'), {
    setHeaders: (res, path) => {
      if (/\.html$/.test(path)) {
        let cspWhitelist = "'self' *.alkemics.com cdn.jsdelivr.net";
        for (let port = 9000; port < 9005; port += 1) {
          cspWhitelist += ` localhost:${port} ws://localhost:${port}`;
        }
        res.set({
          'Content-Security-Policy': `default-src ${cspWhitelist}; style-src ${cspWhitelist} 'unsafe-inline'; frame-ancestors 'self' docs.alkemics.com`,
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security':
            'max-age=31536000; includeSubdomains; preload',
          'Referrer-Policy': 'origin-when-cross-origin',
          'Feature-Policy':
            "camera 'none'; geolocation 'none'; microphone 'none'",
          'Cache-Control': 'no-store',
          Pragma: 'no-cache',
          Expires: '0',
        });
      }
      if (
        /\.(json|txt|js|css|jpg|jpeg|gif|png|svg|ico|eot|otf|woff|woff2|ttf|map)$/.test(
          path
        )
      ) {
        res.set({
          'Cache-Control': 'public, max-age=2592000, immutable',
        });
      }
    },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
  })
);

app.listen(port, () => {
  console.log(
    'Open http://dev.alkemics.com (add host in /etc/hosts if needed)'
  );
});
