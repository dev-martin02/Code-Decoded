---
layout: "../../layouts/BlogPostLayout.astro"
title: "How to Write Clean Comments and Commits"
date: 2024-12-05
description: "Document your code and track changes like a pro."
author: "Martin Morel"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: "Node.js"
---

# How to Write Clean Comments and Commits

_Document your code and track changes like a pro._

---

## **Why Comments and Commits Matter**

1. **Comments**
   - Explain _why_ code exists, not just _what_ it does
   - Help future developers (including you) debug faster
   - Capture context that code alone can’t
2. **Commits**
   - Create a searchable history of changes
   - Simplify collaboration ("Who broke this feature?")
   - Enable safe rollbacks

---

## **Writing Effective Comments**

### 🎯 **Principles**

- **Clarity**: Write in plain English, not jargon
- **Brevity**: Remove obvious comments like `x = 5 # set x to 5`
- **Consistency**: Use the same style (e.g., JSDoc, Python docstrings)
- **Timeliness**: Comment _while_ coding, not as an afterthought

### ✅ **Good vs Bad Examples**

```python
# Bad: Redundant
for user in users:  # Loop through users
    print(user)

# Good: Explains non-obvious logic
# Filter inactive users (last_login < 90 days)
inactive_users = [u for u in users if u.last_login < 90]
```

```jsx
// Bad: Vague
function processData() { /* ... */ } // Does stuff

// Good: Documents inputs/outputs
/**
 * Formats raw API data into CSV
 * @param {Array<Object>} data - Raw API response
 * @returns {string} - CSV-ready text
 */
function formatToCSV(data) { ... }
```

### 📝 **When to Comment**

- Complex algorithms
- Workarounds for bugs ("Temporary fix for API race condition")
- Business logic decisions ("Discount applied per 2024 policy")
- Public APIs (functions, classes, modules)

---

## **Crafting Meaningful Commits**

### 🔑 **Commit Message Structure**

Use the **Conventional Commits** standard:

Copy

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:

Copy

```
feat(auth): add password reset endpoint

- Implements POST /auth/reset-password
- Validates email format before processing

Fixes #123
```

### ✅ **Good vs Bad Commit Messages**

Copy

```python
# Bad: Too vague
git commit -m "Fixed stuff"

# Good: Specific and actionable
git commit -m "fix(login): validate email format on submit"
```

### 📋 **Best Practices**

1. **Atomic Commits**
   - Each commit should address _one_ logical change
   - Avoid: "Fixed bugs and updated styles"
2. **Link to Issues**
   - Add `Closes #45` or `Refs JIRA-789` in footers
3. **Use Imperative Mood**
   - "Add feature" instead of "Added feature"

---

## **Tools & Automation**

### 🛠️ **Comment Helpers**

- **JSDoc/Doxygen**: Generate docs from comments
- **ESLint/TSLint**: Enforce comment rules
- **Codeium/GitHub Copilot**: Auto-generate docstrings

### 🔄 **Commit Automation**

- **Commitizen**: Guided commit messages
- **Husky**: Pre-commit hooks for linting messages
- **Semantic Release**: Auto-versioning based on commit types

---

## **Common Pitfalls to Avoid**

### ❌ **Comments**

- Outdated comments (update when code changes!)
- Commented-out code (delete it; use Git history instead)
- Sarcasm/rants ("This is a hack because PM rushed us")

### ❌ **Commits**

- Giant commits ("Mega refactor – 50 files changed")
- Unrelated changes (e.g., fixing typos in a feature commit)
- Sensitive data (API keys, passwords)

---

## **Pro Tips**

1. **Review Git Logs Weekly**
   - Run `git log --oneline` to audit your habits
2. **Pair Comments with Tests**
   - Tests act as living documentation
3. **Write Commit Messages First**
   - Draft the message _before_ coding to stay focused

---

**Final Rule**: Treat comments and commits as part of your code – messy documentation = messy code.

_Your future self (and teammates) will thank you! 🙌_
