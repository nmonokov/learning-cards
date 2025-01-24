import axios from 'axios';

const REQUEST_QUEUE = new Set();

export const backendAuthentication = async (code: string | null) => {
  try {
    if (REQUEST_QUEUE.has(code)) {
      throw new Error('Duplicate request detected');
    }
    REQUEST_QUEUE.add(code);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!code) {
      throw new Error('Authorization code is missing');
    }

    const response = await axios.post(`${backendUrl}/auth/token`, { code }, {
      headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!response.data.id_token) {
      throw new Error('No id_token in response');
    }

    return response;
  } finally {
    REQUEST_QUEUE.delete(code);
  }
}