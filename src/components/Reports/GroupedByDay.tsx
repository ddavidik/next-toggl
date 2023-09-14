import { groupBy } from '@/helpers/groupBy';
import { TimeEntry } from '@/types/timeEntry';
import { EntriesProps } from '.';

const groupedByDay = (entries: TimeEntry[]) =>
  groupBy(entries, (entries) => String(new Date(entries.start).getDate()));

const aggregateTime = (entries: TimeEntry[]) =>
  entries.reduce(
    (prev, entry) =>
      prev +
      // ms
      (new Date(entry.end).getTime() - new Date(entry.start).getTime()) /
        // to seconds
        1000,
    0
  );

export const GroupedByDay = ({ entries }: EntriesProps) => (
  <table>
    <thead>
      <tr>
        <th>Day</th>
        <th>Seconds worked</th>
        <th>Hours worked</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(groupedByDay(entries)).map(([day, entries]) => {
        const secondsWorked = aggregateTime(entries);
        return (
          <tr key={day}>
            <td>{day}</td>
            <td>{secondsWorked}</td>
            <td>{(secondsWorked / 3600).toFixed(0)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
