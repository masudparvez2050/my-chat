export function setSessionCookie(token) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 24 hour
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `token=${token}; ${expires}; path=/; SameSite=Strict; Secure`;
}

export function setSessionCookieUserName(username) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 24 hour
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `username=${username}; ${expires}; path=/; SameSite=Strict; Secure`;
}
export function setSessionCookieUserEmail(useremail) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 24 hour
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `useremail=${useremail}; ${expires}; path=/; SameSite=Strict; Secure`;
}
export function setSessionCookieUserId(userid) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 24 hour
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `userid=${userid}; ${expires}; path=/; SameSite=Strict; Secure`;
}
export function setSessionCookieUserStatus(userstatus) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 24 hour
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `userstatus=${userstatus}; ${expires}; path=/; SameSite=Strict; Secure`;
}

export function clearSessionCookie() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
  }
}
