import { TimeEntry } from '@/types/timeEntry';
import { EntriesProps } from '.';
import { groupBy } from '@/helpers/groupBy';
import { GroupedByDay } from './GroupedByDay';

const groupedByMonth = (entries: TimeEntry[]) =>
  groupBy(entries, (entries) => String(new Date(entries.start).getMonth()));

export const GroupedByMonth = ({ entries }: EntriesProps) => (
  <table>
    <thead>
      <tr>
        <th>Month</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(groupedByMonth(entries)).map(([month, entries]) => (
        <tr key={month}>
          <td>{+month + 1}</td>
          <td>
            <GroupedByDay entries={entries} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
