import { getAllProjects } from '@/serverCalls/projects';
import { Projects } from '@/components/Projects';

async function getData() {
  const res = await getAllProjects();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="mx-6">
      <h1 className="font-bold my-4">Projects</h1>
      <Projects projects={data} />
    </div>
  );
}
