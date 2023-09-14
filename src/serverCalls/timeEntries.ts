import { generateUrl } from '@/helpers/generate_url';
import { TimeEntry } from '@/types/timeEntry';

export const getAllTEs = async () =>
  await fetch(generateUrl('/time-entries'), {
    cache: 'no-store',
  });

export const createTE = async (timeEntry: TimeEntry) =>
  await fetch(generateUrl('/time-entries'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });

export const updateTE = async (timeEntry: TimeEntry) =>
  await fetch(generateUrl('/time-entries'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });

export const deleteTE = async (timeEntry: TimeEntry) =>
  await fetch(generateUrl('/time-entries'), {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });
