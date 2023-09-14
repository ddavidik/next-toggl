import { groupBy } from '@/helpers/groupBy';
import { TimeEntry } from '@/types/timeEntry';
import { GroupedByYear } from './GroupedByYear';

export type EntriesProps = {
  entries: TimeEntry[];
};

export const Reports = ({ entries }: EntriesProps) => {
  const groupedByProject = groupBy(entries, (entries) =>
    String(entries.project_id)
  );

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Hours worked</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedByProject).map(([projectId, entries]) => (
            <tr key={projectId}>
              <td>{projectId}</td>
              <td>
                <GroupedByYear entries={entries} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
