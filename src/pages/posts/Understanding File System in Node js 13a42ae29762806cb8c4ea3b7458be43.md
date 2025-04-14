---
layout: "../../layouts/BlogPostLayout.astro"
title: "Understanding File System in Node.js"
date: 2024-12-05
description: "This is a quick introduction to File System in Node.js"
author: "Martin Morel"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: "Node.js"
---

# Understanding File System in Node.js

Hello Guys 👋🏽, in this article I will teach you the basic functionalities of the Fs module of Node.js. Learning how to interact with files will open the doors to create more projects or scripts, which can help you in your day to day task or just to automate your life !

_Requirements_

- Some understanding of JavaScript
  - Promises, Functions and Callbacks
  - Error Handling try/ca
  - Async/await

## Introduction to File System

In Node.js there is 3 different ways to use this module

- Callback Form
  - The best one for performance
  - Damage the readability of the code
- Promised Form
  - Improve readability of the code
  - You won’t get the best performance
- Synchronous Form

**_How do we use the fs module?_**

The fs module it comes by default from Node.js, meaning that we don’t need to install a new package. But we do need to import it.

_Import module_

```jsx
// Callback / Synchronous Version
import fs from "fs"; // ES6 Modules
const fs = require("node"); // CommonJS

// Promised Version
import fs from "node:fs/promises"; // ES6 Modules
const fs = require("node:fs/promises"); // CommonJS
```

### Interacting with a file

Before we can do any operation in a file we need to use the `open()` method. This method will return an integer (number) which is used to identify the file that we just open, this number is usually called a “file descriptor”. We can think of this number as an ID for our file.

- `fs.open(filePath, mode)`
  - Filepath → will take the path of the file which we want to interact with
  - Mode → we have to specify which mode of the 2 that are available (read or write) we are going to use for the file

Once we are done using the file, we always have to close it. We can close a file using `close()`

<aside >
💡

Leaving a file open will keep running in our memory and will wasted resources that may lead to bigger problems

</aside >

> [!NOTE]
>
> You may not be familiar with JavaScript's [numeric separators](/js/s/numeric-separator), which are used in the examples below. They're **syntactic sugar** that make large numeric values more readable.

_Reading a File_

```jsx
// import our module
import fs from "node:fs/promises";

try {
  // open our file
  const fileToRead = await fs.open("text.tx", "r");
  const fileContent = filetoRead.read(); //This line will read the file

  // The result will be an obj, we select the buffer propertie and convert it to string
  console.log(fileContent.buffer.toString());
} catch (err) {
  console.log("there was an error:", err.message);
} finally {
  fileToRead.close(); // this will close the file regardless of the outcome
}
```

_Writing a File_

```jsx
// // import our module
import fs from "node:fs/promises";

try {
  // open our file
  const fileToRead = await fs.open("text.tx", "w");
  const textToFile = filetoRead.write("Hello World"); //This line will write in the file
} catch (err) {
  console.log("there was an error:", err.message);
} finally {
  fileToRead.close(); // this will close the file regardless of the outcome
}
```

Let's explore these common file system operations in Node.js:

### Creating Files and Folders

```jsx
// Creating a new file
const createFile = async () => {
  try {
    const newFile = await fs.open("newFile.txt", "w");
    await newFile.close();
  } catch (err) {
    console.log("Error creating file:", err.message);
  }
};

// Creating a new folder
const createFolder = async () => {
  try {
    await fs.mkdir("newFolder");
  } catch (err) {
    console.log("Error creating folder:", err.message);
  }
};
```

### Deleting Files and Getting File Info

```jsx
// Deleting a file
const deleteFile = async () => {
  try {
    await fs.unlink("fileToDelete.txt");
  } catch (err) {
    console.log("Error deleting file:", err.message);
  }
};

// Getting file information
const getFileInfo = async () => {
  try {
    const stats = await fs.stat("myFile.txt");
    console.log("File size:", stats.size);
    console.log("File extension:", path.extname("myFile.txt"));
    console.log("Created at:", stats.birthtime);
    console.log("Last modified:", stats.mtime);
  } catch (err) {
    console.log("Error getting file info:", err.message);
  }
};
```

## **Project Ideas Using the FS Module**

1. **Automated File Organizer**
   - Scan a folder and move files into subfolders based on extension (e.g., `.jpg` → `/images`).
2. **Log File Cleaner**
   - Delete log files older than 30 days.
3. **Markdown Blog Generator**
   - Convert `.md` files to HTML with a Node.js script.
4. **Configuration File Backup**
   - Copy `config.json` to `config_backup.json` daily.
