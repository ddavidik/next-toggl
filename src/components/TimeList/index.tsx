'use client';

import { TimeEntry } from '@/types/timeEntry';
import { useState } from 'react';
import { Dialog } from '../Dialog';
import { TimeEditForm } from '../TimeEditForm';
import { formatDate } from '@/helpers/formatDate';
import { deleteTE, updateTE } from '@/serverCalls/timeEntries';
import { useRouter } from 'next/navigation';

type Props = {
  entries: TimeEntry[];
};

export const TimeList = ({ entries }: Props) => {
  const [editingEntry, setEditingEntry] = useState<TimeEntry>();
  const [deletingEntry, setDeletingEntry] = useState<TimeEntry>();

  const router = useRouter();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement>,
    entry: TimeEntry
  ) => {
    e.preventDefault();
    if (!entry) return;

    await updateTE({
      ...entry,
      user_name: process.env.NEXT_PUBLIC_USERNAME!,
    })
      .then(() => {
        router.refresh();
        setEditingEntry(undefined);
      })
      .catch((error) => {
        console.error('Error updating entry:', error);
      });
  };

  const handleDelete = async () => {
    if (!deletingEntry) return;

    await deleteTE({
      ...deletingEntry,
      user_name: process.env.NEXT_PUBLIC_USERNAME!,
    })
      .then(() => {
        setDeletingEntry(undefined);
        router.refresh();
      })
      .catch((error) => {
        console.error('Error deleting entry:', error);
      });
  };

  return (
    <>
      <Dialog open={!!editingEntry} close={() => setEditingEntry(undefined)}>
        <TimeEditForm
          key={editingEntry?.id}
          entry={editingEntry!}
          handleSave={handleSave}
        />
      </Dialog>
      <Dialog open={!!deletingEntry} close={() => setDeletingEntry(undefined)}>
        <div className="mb-4">
          <p>
            Are you sure you want to delete entry with ID: {deletingEntry?.id}?
          </p>
          <button className="btn btn-error w-full mt-4" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Dialog>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Project ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.task}</td>
                <td>{formatDate(new Date(entry.start))}</td>
                <td>{formatDate(new Date(entry.end))}</td>
                <td>{entry.project_id}</td>
                <td>
                  <button
                    className="btn btn-neutral btn-sm mr-4"
                    onClick={() =>
                      setEditingEntry(entries.find((e) => e.id === entry.id))
                    }
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      setDeletingEntry(entries.find((e) => e.id === entry.id))
                    }
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
