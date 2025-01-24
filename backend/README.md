#### Backend README
# Backend Deployment

0. Create Google OAuth Client
- Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
- APIs & Services > Credentials > Create Credentials
- Name the client
- Set Authorized redirect URIs 
```
https://learning-cards-${stage}.auth.${region}.amazoncognito.com/oauth2/idpresponse
http://localhost:3000/auth/callback
```
Substitute `stage` and `region` with appropriate values(e.g. `dev` and `us-west-2)`

1. Store secrets in AWS SSM:
```bash
aws ssm put-parameter --name /app/google/client_id --value "YOUR_GOOGLE_CLIENT_ID" --type SecureString
aws ssm put-parameter --name /app/google/client_secret --value "YOUR_GOOGLE_SECRET" --type SecureString
```

2. Deploy:
```bash
npm install
serverless deploy
```

3. Update ssm parameters with the new values from Cognito and redeploy
```
# Replace {region} and {stage} with appropriate values 
REGION={region}
STAGE={stage}

# Get outputs from first deployment for Linux/Mac
COGNITO_USER_POOL_ID=$(aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolId'].OutputValue" --output text)
COGNITO_CLIENT_ID=$(aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolClientId'].OutputValue" --output text)
COGNITO_CLIENT_SECRET=$(aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolClientSecret'].OutputValue" --output text)

# For Windows
COGNITO_USER_POOL_ID = aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolId'].OutputValue" --output text
COGNITO_CLIENT_ID = aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolClientId'].OutputValue" --output text
COGNITO_CLIENT_SECRET = aws cloudformation describe-stacks --region $REGION --stack-name learning-cards-backend-$STAGE --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolClientSecret'].OutputValue" --output text

# Update SSM parameters
aws ssm put-parameter --region $REGION --name /app/cognito/user_pool_id --value $COGNITO_USER_POOL_ID --type String --overwrite
aws ssm put-parameter --region $REGION --name /app/cognito/client_id --value $COGNITO_CLIENT_ID --type String --overwrite
aws ssm put-parameter --region $REGION --name /app/cognito/client_secret --value $COGNITO_CLIENT_SECRET --type SecureString --overwrite

# Redeploy
serverless deploy
```
