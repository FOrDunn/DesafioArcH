import { client } from "../../config/retryFunction";

export async function redisSearch(id: number) {
  const searchOnRedis = Number(await client.get(`${id}`));
  if (searchOnRedis !== null && searchOnRedis !== NaN) return searchOnRedis;
}
