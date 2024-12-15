export default async function Filter() {
  type Frontmatter = {
    tags: string;
  };

  type Post = {
    frontmatter: Frontmatter;
  };

  const allMarkdownFiles = import.meta.glob("../pages/posts/*.md");
  const tagObj: Record<string, number> = {};

  const allPosts: Post[] = await Promise.all(
    Object.values(allMarkdownFiles).map(async (importFunction) => {
      const module = await importFunction();
      return module as Post; // Explicitly type the resolved module
    })
  );

  for (const post of allPosts) {
    const tag = post.frontmatter.tags.toLowerCase();

    if (!tagObj[tag]) {
      tagObj[tag] = 1;
    }
  }

  let checkedTags: String[] = [];

  const handleApply = (): void => {
    // select all checked checkboxes
    const checkedCheckboxes = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked'
      )
    );
    checkedTags = checkedCheckboxes.map((checkbox) => checkbox.name);
    console.log(checkedTags);
  };
  return (
    <fieldset>
      <legend>Which topic would you like to read about?</legend>

      {Object.keys(tagObj).map((key) => (
        <div>
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
