import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer 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`,
  },
});
