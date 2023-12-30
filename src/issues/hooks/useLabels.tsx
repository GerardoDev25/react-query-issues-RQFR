import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,

    // initialData
    placeholderData: [
      {
        id: 1205087127,
        node_id: 'MDU6TGFiZWwxMjA1MDg3MTI3',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Features',
        name: 'Component: Concurrent Features',
        color: 'ffccd3',
        default: false,
      },
      {
        id: 2281766624,
        node_id: 'MDU6TGFiZWwyMjgxNzY2NjI0',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Scheduling%20Profiler',
        name: 'Component: Scheduling Profiler',
        color: '1dc3d6',
        default: false,
      },
    ],
  });

  return labelsQuery;
};
