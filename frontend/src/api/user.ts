import axios from 'axios';
import { getAuthHeader } from '../lib/googleToken';

const { REACT_APP_BACKEND_URL } = process.env;

interface WelcomeApiResponse {
  message: string;
}

export const fetchWelcomeMessage = async (): Promise<string> => {
  try {
    const response = await axios.get<WelcomeApiResponse>(`${REACT_APP_BACKEND_URL}/welcome`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    return response.data.message;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};