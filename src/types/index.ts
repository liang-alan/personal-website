interface Project {
  id?: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
  image?: string;
}

interface Profile {
  name: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    [key: string]: string;
  };
  projects: Project[];
  introImage?: string;
}

export type { Profile, Project };