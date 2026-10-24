export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profiles[];
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Profiles {
  network: string;
  username: string;
  url: string;
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string | null;
  score: string;
  courses: string[];
}

export interface Skills {
  name: string;
  level: string;
  keywords: string[];
}

export interface Languages {
  language: string;
  fluency: string;
}

export interface Projects {
  name: string;
  isActive: boolean;
  description: string;
  highlights: string[];
  url: string;
  github?: string;
}

export interface CV {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skills[];
  languages: Languages[];
  projects: Projects[];
}
