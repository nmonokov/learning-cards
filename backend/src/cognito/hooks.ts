import { PreSignUpTriggerEvent } from 'aws-lambda';
import { property } from '../util/property';
import { logger } from '../util/logger';

const EMAILS_WHITE_LIST: string = property('EMAILS_WHITE_LIST', '');

export const preSignUp = async (event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> => {
  logger.debug({
    message: 'Registering new user.',
    event,
  });
  const { userAttributes }  = event.request;
  if (!userAttributes) {
    throw new Error('Insufficient parameters.');
  }

  const { email } = userAttributes;
  if (EMAILS_WHITE_LIST && EMAILS_WHITE_LIST.length > 0 && !EMAILS_WHITE_LIST.includes(email)) {
    throw new Error('User is not allowed to use this app. Request access.');
  }

  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  logger.debug({
    message: 'Validate set parameters',
    event,
  });
  return event
}
