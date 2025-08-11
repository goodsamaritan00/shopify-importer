const authHeaders = (token: string) => {
  const AUTH_HEADERS: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return AUTH_HEADERS;
};

export default authHeaders