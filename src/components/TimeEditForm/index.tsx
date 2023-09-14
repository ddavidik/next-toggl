'use client';

import { TimeEntry } from '@/types/timeEntry';
import { Input } from '../Input';
import { useState } from 'react';
import { formatDate } from '@/helpers/formatDate';

type Props = {
  entry: TimeEntry;
  handleSave: (
    e: React.MouseEvent<HTMLButtonElement>,
    entry: TimeEntry
  ) => Promise<void>;
};

export const TimeEditForm = ({ entry, handleSave }: Props) => {
  const [timeEntry, setTimeEntry] = useState<TimeEntry>(entry);

  if (!timeEntry) return;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimeEntry({ ...timeEntry, [name]: value });
  };

  return (
    <form>
      <Input
        label="Task"
        name="task"
        value={timeEntry.task}
        onChange={handleChange}
      />
      <Input
        label="Start"
        name="start"
        value={formatDate(new Date(timeEntry.start))}
        type="datetime-local"
        onChange={handleChange}
      />
      <Input
        label="End"
        name="end"
        value={formatDate(new Date(timeEntry.end))}
        type="datetime-local"
        onChange={handleChange}
      />
      <button
        className="btn btn-primary my-4 w-full"
        onClick={(e) => handleSave(e, timeEntry)}
      >
        Save
      </button>
    </form>
  );
};
