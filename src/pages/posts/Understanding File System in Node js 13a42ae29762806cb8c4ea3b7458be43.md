---
layout: "../../layouts/BlogPostLayout.astro"
title: "Understanding File System in Node.js"
pubDate: 2024-12-05
description: "This is a quick introduction to File System in Node.js"
author: "Martin Morel"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["Node.js"]
---

Hello Guys 👋🏽, in this article I will teach you the basic of the FS module API of Node.js, you will be learning how to create, read, write and update a file. Dealing with files will be a crucial piece of knowledge, because everything in a computer is a file. By learning how to deal a file it will open your mind to write more useful programs or scripts to solve real life problems.

_Requirements_

- Some understanding of JavaScript
  - Promises, Functions and Callbacks
  - Error Handling
  - Async/await

## Introduction to File System

In Node.js there is 3 different ways to use this module. It could be a callback, promised or synchronous form . In general, if your building a big program and you need the best performance you will have the use the Callback form. Otherwise, stick with the promise based version, that way you keep your code clean and easy to debug. In very Particular situations you will have to use the synchronous form…………

_How do we use the fs module ?_

```jsx
// Callback Version
import fs from "fs"; // ES6
const fs = require("node"); // CommonJS
```
