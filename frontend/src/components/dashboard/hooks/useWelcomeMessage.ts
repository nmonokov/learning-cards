import { useState, useEffect } from 'react';
import { fetchWelcomeMessage } from '../../../api/user';

export const useWelcomeMessage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const welcomeMessage = await fetchWelcomeMessage();
        setMessage(welcomeMessage);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to load message'));
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, []);

  return { message, loading, error };
};