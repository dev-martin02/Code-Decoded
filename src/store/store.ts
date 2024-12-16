import { atom } from "nanostores";
export type BlogPost = {
  postUrl: string;
  title: string;
  date: string;
  description: string;
  author: string;
  image: {
    url: string;
    alt: string;
  };
  tags: string;
};

export const blogsStore = atom<BlogPost[]>([]);

export const filteredPosts = atom<BlogPost[]>([]);

export const filterCriteriaStore = atom([0]);
