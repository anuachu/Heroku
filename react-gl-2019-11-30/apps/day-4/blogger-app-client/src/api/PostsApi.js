const apiBaseUrl = 'http://localhost:3001/posts';

export const getPosts = async () => {
  const response = await fetch(apiBaseUrl);
  return await response.json();
};

export const getPost = async id => {
  const response = await fetch(`${apiBaseUrl}/${id}`);
  return await response.json();
};

export const createPost = async post => {
  const response = await fetch(
    apiBaseUrl,
    {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return await response.json();
};

export const updatePost = async (id, post) => {
  const response = await fetch(
    `${apiBaseUrl}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return await response.json();
};

export const deletePost = async id => {
  const response = await fetch(
    `${apiBaseUrl}/${id}`,
    {
      method: 'DELETE'
    }
  );

  return await response.json();
};
