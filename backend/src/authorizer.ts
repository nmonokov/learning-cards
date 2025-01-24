import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

const {
  COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID,
} = process.env
const verifier = CognitoJwtVerifier.create({
  userPoolId: COGNITO_USER_POOL_ID,
  clientId: COGNITO_CLIENT_ID,
  tokenUse: 'id'
});
const ALLOW = 'Allow';
const DENY = 'Deny';


export const verify = async (event: APIGatewayRequestAuthorizerEvent) => {
  try {
    const token = event.headers?.Authorization?.split(' ')[1];
    if (!token) {
      return generatePolicy('user', DENY, event.methodArn);
    }
    const payload = await verifier.verify(token);
    return generatePolicy(payload.sub, ALLOW, event.methodArn, {
      principalId: payload.sub,
      context: {
        email: payload.email as string
      }
    });
  } catch (error) {
    return generatePolicy('user', DENY, event.methodArn);
  }
};

const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string,
  additionalContext?: any
) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    }]
  },
  ...additionalContext
});