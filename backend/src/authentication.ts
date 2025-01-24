import axios from 'axios';
import { corsHeaders } from './http';

const {
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  COGNITO_DOMAIN,
  ORIGIN,
  REGION,
  REDIRECT_URI,
  JWT_ISSUER,
} = process.env
const USED_CODES = new Set();
setInterval(() => {
  USED_CODES.clear();
}, 300000); // clean after 5 minutes window

export const token = async (event: any) => {
  console.debug({
    message: 'Environment variables',
    JWT_ISSUER
  });
  const { code } = JSON.parse(event.body);
  // Prevent code reuse
  if (USED_CODES.has(code)) {
    return {
      statusCode: 400,
      headers: corsHeaders(ORIGIN),
      body: JSON.stringify({ error: "Authorization code already used" })
    };
  }
  USED_CODES.add(code);

  try {
    const basicAuth = Buffer.from(`${COGNITO_CLIENT_ID}:${COGNITO_CLIENT_SECRET}`).toString('base64');
    const tokenResponse = await axios.post(
      `https://${COGNITO_DOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/token`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: COGNITO_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code: code
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        id_token: tokenResponse.data.id_token,
        access_token: tokenResponse.data.access_token
      }),
      headers: corsHeaders(ORIGIN),
    };
  } catch (error) {
    console.error({
      message: "Failed to authenticate.",
      error,
    });
    USED_CODES.delete(code);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authentication failed' }),
      headers: corsHeaders(ORIGIN),
    };
  }
};