import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';

const getIssue = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
};

export const useIssues = () => {
  const issueQuery = useQuery({ queryKey: ['issue'], queryFn: getIssue });
  return { issueQuery };
};
