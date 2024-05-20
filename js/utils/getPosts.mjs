import { fetchAuth } from "./fetchAuth.mjs";

export async function getPosts(url) {
  const res = await fetchAuth(url);
  const json = await res.json();
  const posts = json.data;
  if (res.ok) {
    return posts;
  }

  throw new Error(json.message);
}
