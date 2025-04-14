import { useEffect, useState } from "react";
import { blogsStore, filteredPosts } from "../store/store";
import type { BlogPost } from "../store/store";
import { useStore } from "@nanostores/react";

export default function Filter() {
  // State for tags and selected tags
  const [tags, setTags] = useState<Record<string, number>>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const blogs = useStore(blogsStore);

  // Generate tags from blog posts
  useEffect(() => {
    const tagCounts: Record<string, number> = {};

    blogs.forEach((post) => {
      const tag = post.tags.toLowerCase();
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    setTags(tagCounts);
  }, [blogs]);

  // Handle checkbox changes
  const handleCheckboxChange = (tag: string, isChecked: boolean) => {
    setSelectedTags((prev) =>
      isChecked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

  // Apply filters
  const handleApply = () => {
    if (selectedTags.length === 0) {
      // If no tags selected, show all posts
      filteredPosts.set(blogs);
      return;
    }

    const filtered = blogs.filter((post) =>
      selectedTags.includes(post.tags.toLowerCase())
    );

    filteredPosts.set(filtered);
  };

  return (
    <fieldset className="filter-container p-4 border rounded-lg">
      <legend className="text-lg font-medium mb-3">
        Which topic would you like to read about?
      </legend>

      <div className="tag-options grid grid-cols-2 gap-2 md:grid-cols-3">
        {Object.entries(tags).map(([tag, count]) => (
          <div key={tag} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`tag-${tag}`}
              name={tag}
              checked={selectedTags.includes(tag)}
              onChange={(e) => handleCheckboxChange(tag, e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor={`tag-${tag}`} className="text-sm capitalize">
              {tag} <span className="text-gray-500 text-xs">({count})</span>
            </label>
          </div>
        ))}
      </div>

      {Object.keys(tags).length === 0 && (
        <p className="text-gray-500 text-sm my-2">No tags available</p>
      )}

      <button
        className="border-2 rounded-md px-4 py-2 mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        onClick={handleApply}
        disabled={Object.keys(tags).length === 0}
      >
        Apply Filters
      </button>
    </fieldset>
  );
}
