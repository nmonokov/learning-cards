import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const test = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: 'ok',
  }
}