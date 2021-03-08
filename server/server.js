/* eslint-disable no-console */
const path = require('path');
const liveServer = require('live-server');
const historyApiFallback = require('connect-history-api-fallback');
const cors = require('cors');

const params = {
  port: 80,
  root: path.resolve(process.cwd(), 'public'),
  middleware: [historyApiFallback(), cors({ origin: '*' })],
  open: false,
  logLevel: 0,
};

liveServer.start(params);
console.log('Open http://dev.alkemics.com (add host in /etc/hosts if needed)');
