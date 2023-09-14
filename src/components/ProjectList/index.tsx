import { Project } from '@/types/project';
import { useState } from 'react';

type Props = {
  projects: Project[];
  onSelect: (id: number) => () => void;
  onToggle: (id: number) => () => void;
};

type TogglableCellProps = {
  isActive: boolean;
  value?: string;
};

const TogglableCell = ({ isActive, value }: TogglableCellProps) => (
  <td className={isActive ? undefined : 'line-through'}>{value}</td>
);

export const ProjectList = ({ projects, onSelect, onToggle }: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredProjects = projects.filter((project) =>
    project.user_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="form-control mb-4 flex flex-row justify-start space-x-4">
        <label htmlFor="searchInput" className="self-center">
          Filter by owner:
        </label>
        <input
          type="text"
          id="searchInput"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="Enter username..."
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <TogglableCell
                  isActive={project.active}
                  value={String(project.id)}
                />
                <TogglableCell isActive={project.active} value={project.name} />
                <TogglableCell
                  isActive={project.active}
                  value={project.user_name}
                />
                <td>
                  <button
                    className="btn btn-neutral btn-sm mr-4"
                    disabled={
                      project.user_name !== process.env.NEXT_PUBLIC_USERNAME
                    }
                    onClick={onSelect(project.id!)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={
                      project.user_name !== process.env.NEXT_PUBLIC_USERNAME
                    }
                    onClick={onToggle(project.id!)}
                  >
                    toggle
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
