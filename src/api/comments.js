import { BASE_URL } from '../constant';
import { _fetchWithAuthentication } from '../utils/api';

const commentsApi = (() => {
  const createComment = async (content, id) => {
    const response = await _fetchWithAuthentication(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  };

  return { createComment };
})();
export default commentsApi;
