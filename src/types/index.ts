interface Work {
  company: string;
  title: string;
  location?: string;
  start: string;
  end?: string;
  responsibilities: string[];
  image?: string;
}

interface Project {
  id?: string;
  title: string;
  date: string;
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
  work: Work[];
}

export type { Profile, Project, Work };