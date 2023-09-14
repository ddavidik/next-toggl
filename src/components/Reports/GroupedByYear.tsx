import { TimeEntry } from '@/types/timeEntry';
import { EntriesProps } from '.';
import { groupBy } from '@/helpers/groupBy';
import { GroupedByMonth } from './GroupedByMonth';

const groupedByYear = (entries: TimeEntry[]) =>
  groupBy(entries, (entries) => String(new Date(entries.start).getFullYear()));

export const GroupedByYear = ({ entries }: EntriesProps) => (
  <table>
    <thead>
      <tr>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(groupedByYear(entries)).map(([year, entries]) => (
        <tr key={year}>
          <td>{year}</td>
          <td>
            <GroupedByMonth entries={entries} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
