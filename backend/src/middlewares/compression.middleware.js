import compression from 'compression';
import zlib from 'node:zlib';

const shouldCompress = (req, res) => {
  if (res.getHeader('Content-Encoding')) return false;

  if (req.headers['x-no-compression']) return false;

  const rawType = res.getHeader('Content-Type') || '';
  const type = Array.isArray(rawType)
    ? rawType.join(';').toLowerCase()
    : rawType.toString().toLowerCase();

  if (
    type.startsWith('image/') ||
    type.startsWith('video/') ||
    type.startsWith('audio/') ||
    type.startsWith('application/zip') ||
    type.startsWith('application/pdf')
  ) {
    return false;
  }

  return compression.filter(req, res);
};

const compressionMiddleware = compression({
  threshold: '1kb',
  brotli: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
    },
  },

  filter: shouldCompress,

  level: 6,
});

export default compressionMiddleware;
