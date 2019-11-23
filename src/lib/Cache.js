import Redis from 'ioredis';

class Cache {
  constructor() {
    this.PREFIX = process.env.NODE_ENV === 'test' ? 'cache-test:' : 'cache:';

    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: this.PREFIX,
    });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`${this.PREFIX}${prefix}:*`);

    const keysWithouPrefix = keys.map(key => key.replace(`${this.PREFIX}`, ''));

    return this.redis.del(keysWithouPrefix);
  }
}

export default new Cache();
