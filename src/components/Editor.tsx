import React, { useState, ChangeEvent, FormEvent } from 'react';

type ProjectForm = {
  title: string;
  description: string;
};

type ProfileForm = {
  name: string;
  bio: string;
  projects: ProjectForm[];
};

const Editor: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileForm>({
    name: '',
    bio: '',
    projects: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    setProfileData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { title: '', description: '' }],
    }));
  };

  const handleProjectChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedProjects = [...profileData.projects];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- index exists by construction
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value,
    };
    setProfileData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the profileData to your API
    console.log('Submitted Profile Data:', profileData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={profileData.name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Bio:
          <textarea name="bio" value={profileData.bio} onChange={handleChange} />
        </label>
      </div>
      <div>
        <h3>Projects</h3>
        {profileData.projects.map((project, index) => (
          <div key={index}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Editor;