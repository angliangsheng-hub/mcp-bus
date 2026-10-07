import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-serverless-middleware',
    configureServer(server) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }
        try {
          const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const pathname = parsedUrl.pathname;

          let handlerModule: any;
          if (pathname === '/api/health' || pathname === '/api/health.js') {
            handlerModule = await import('./api/health.js');
          } else if (
            pathname === '/api/bus-arrival' ||
            pathname === '/api/bus-arrival.js' ||
            pathname === '/api/BusArrival' ||
            pathname === '/api/BusArrival.js'
          ) {
            handlerModule = await import('./api/bus-arrival.js');
          }

          if (handlerModule && handlerModule.default) {
            if (!res.status) {
              res.status = (code: number) => {
                res.statusCode = code;
                return res;
              };
            }
            if (!res.json) {
              res.json = (data: any) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };
            }
            req.query = Object.fromEntries(parsedUrl.searchParams.entries());
            return await handlerModule.default(req, res);
          }
          next();
        } catch (err: any) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal API Server Error', details: err.message }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

