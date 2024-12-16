import { useEffect, useState } from "react";
import type { BlogPost } from "../store/store";
import { blogsStore, filteredPosts } from "../store/store";
import { useStore } from "@nanostores/react";
type MarkdownModule = {
  url: string;
  frontmatter: {
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
};
export function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const filteredPost = useStore(filteredPosts);

  useEffect(() => {
    const allPosts = import.meta.glob("../pages/posts/*.md");
    const blogArr: BlogPost[] = [];

    Promise.all(
      Object.keys(allPosts).map((path) =>
        allPosts[path]().then((module) => {
          const { url, frontmatter } = module as MarkdownModule;
          blogArr.push({
            postUrl: url,
            title: frontmatter.title,
            date: frontmatter.date,
            description: frontmatter.description,
            author: frontmatter.author,
            image: {
              url: frontmatter.image.url,
              alt: frontmatter.image.alt,
            },
            tags: frontmatter.tags,
          });
        })
      )
    ).then(() => {
      setPosts(blogArr);
      blogsStore.set(blogArr);
    });
  }, [filteredPost, blogsStore]);

  const blogStyle = (arr: BlogPost[]) =>
    arr.map((post) => (
      <li
        key={post.postUrl}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
      >
        <a href={post.postUrl} className="block hover:bg-gray-50 h-full">
          {post.image && (
            <div className="h-48 w-full overflow-hidden">
              <img
                src={post.image.url}
                alt={post.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              {post.title}
            </h4>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{post.author}</span>
              <span> {new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
        </a>
      </li>
    ));

  console.log("filterd", filteredPost);

  return (
    <>{filteredPost.length > 0 ? blogStyle(filteredPost) : blogStyle(posts)}</>
  );
}
