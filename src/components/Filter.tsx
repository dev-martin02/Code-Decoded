import { useEffect, useState } from "react";
import { blogsStore, filteredPosts } from "../store/store";
import type { BlogPost } from "../store/store";
import { useStore } from "@nanostores/react";

export default function Filter() {
  // State to store the dynamically generated tags
  const [tags, setTags] = useState<Record<string, number>>({});
  const blogs = useStore(blogsStore);

  useEffect(() => {
    const tagObj: Record<string, number> = {};

    for (const post of blogs) {
      const tag = post.tags.toLowerCase();

      if (!tagObj[tag]) {
        tagObj[tag] = 1;
      }
    }

    setTags(tagObj);
  }, [blogs]);

  let checkedTags: string[] = [];

  // Handle the "Apply" button logic
  const handleApply = (): void => {
    const checkedCheckboxes = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked'
      )
    );

    checkedTags = checkedCheckboxes.map((checkbox) => checkbox.name);
    const articles: BlogPost[] = [];

    for (const tag of checkedTags) {
      console.log(tag);
      blogsStore.value.forEach((data) => {
        console.log(data.tags);
        if (data.tags.toLocaleLowerCase() === tag) {
          articles.push(data);
        }
      });
    }

    console.log(articles);
    filteredPosts.set(articles);
    console.log(filteredPosts.value);
    console.log(tags);
  };

  return (
    <fieldset>
      <legend>Which topic would you like to read about?</legend>

      {Object.keys(tags).map((key) => (
        <div key={key}>
          <input type="checkbox" id={key} name={key} />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}

      <button
        className="border-2 rounded-md px-3 py-1 mt-3"
        onClick={handleApply}
      >
        Apply
      </button>
    </fieldset>
  );
}
