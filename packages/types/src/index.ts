// Core shared types for the COMA platform

export type UserRole = 'GUEST' | 'RESEARCHER' | 'FUNDER' | 'ADMIN';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  affiliation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  orcidId?: string;
  avatarUrl?: string;
  researchAreas: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Funder {
  id: string;
  name: string;
  description?: string;
  website?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  startDate: Date;
  endDate?: Date;
  fundingAmount: number;
  currency: string;
  funderId: string;
  piUserId?: string;
  tags: string[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  createdAt: Date;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  spaceId: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
