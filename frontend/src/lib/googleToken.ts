import { safeJsonParse } from './util';

export const googleLogin = () => {
  const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN_NAME!;
  const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID!;
  const region = process.env.REACT_APP_AWS_REGION!;

  const redirectUri = encodeURIComponent(
    window.location.origin + '/auth/callback'
  );

  window.location.href =
    `https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=code&client_id=${clientId}&scope=email+openid+profile`;
};

export const storeTokens = (idToken: string) => {
  localStorage.setItem('cognito_id_token', idToken);
};

export const clearTokens = () => {
  localStorage.removeItem('cognito_id_token');
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('cognito_id_token');
  return token ? `Bearer ${token}` : '';
};

interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const payloadBase64Url = parts[1];
  if (!payloadBase64Url) {
    return false;
  }

  // Base64URL -> Base64 conversion with padding
  const base64 = payloadBase64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(payloadBase64Url.length + (4 - (payloadBase64Url.length % 4)) % 4, '=');

  // Safe decoding
  const decodedPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  const payload = safeJsonParse<JwtPayload>(decodedPayload);
  return !!payload?.exp && Date.now() < payload.exp * 1000;
};

