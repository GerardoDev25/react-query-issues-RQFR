import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../share.components/LoadingIcon';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issueQuery } = useIssues({ state, labels: selectedLabels });

  const onChangeLabel = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {issueQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issueQuery.data || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}

        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button className='btn btn-outline-secondary'>Prev</button>
          <span>123</span>
          <button className='btn btn-outline-primary'>Next</button>
        </div>
      </div>

      <div className='col-4'>
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  );
};
