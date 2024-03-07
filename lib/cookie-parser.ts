export function parseCookies(cookie: Array<string>): string {
  const authorization = cookie[0].split(";");
  const token = authorization[0].slice(authorization[0].indexOf("=") + 1);

  return token;
}
