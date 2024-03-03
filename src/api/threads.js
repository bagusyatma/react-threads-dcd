import { BASE_URL } from '../constant';
import { _fetchWithAuthentication } from '../utils/api';

const threadsApi = (() => {
  const createThread = async ({ title, body, category }) => {
    const response = await _fetchWithAuthentication(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  };

  const getAllThreads = async () => {
    const response = await _fetchWithAuthentication(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  };

  const getDetailThread = async (id) => {
    const response = await _fetchWithAuthentication(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  };

  return { createThread, getAllThreads, getDetailThread };
})();

export default threadsApi;
