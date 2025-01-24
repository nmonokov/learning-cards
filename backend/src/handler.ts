import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { corsHeaders } from './http';

const {
  ORIGIN,
} = process.env;

export const welcome = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const email = event.requestContext.authorizer?.email;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${email}` }),
    headers: corsHeaders(ORIGIN),
  };
}