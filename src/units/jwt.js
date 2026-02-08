export const getToken = () => {
  return localStorage.getItem("token");
};

export const getPayload = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload));
  } catch (e) {
    return null;
  }
};

export const getRole = () => {
  const payload = getPayload();
  return payload?.role || null;
};
