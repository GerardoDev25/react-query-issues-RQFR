import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { sleep } from '../../helpers/sleep';

const getIssue = async (): Promise<Issue[]> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
};

export const useIssues = () => {
  const issueQuery = useQuery({ queryKey: ['issue'], queryFn: getIssue });
  return { issueQuery };
};
