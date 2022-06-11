import { SERVER_URL } from "../core/config";

export async function fetcher(url: string) {
  return fetch(SERVER_URL + url, { method: "GET" }).then((res) => res.json());
}
