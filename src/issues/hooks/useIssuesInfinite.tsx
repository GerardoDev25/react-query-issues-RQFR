import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers';
import { githubApi } from '../../api/githubApi';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', '1');
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels, page: 1 }],
    queryFn: (data) => getIssues(data),
    // getNextPageParam: (lastPage, pages) => {}
  });

  return {
    issuesQuery
  };
};
