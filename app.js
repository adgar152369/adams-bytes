const express = require('express');
const bodyParse = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { fetchBlogData, updateBlogPost } = require('./utils');
const { connectToDB } = require('./database');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// connect to db
connectToDB();

// general middleware
app.use(cors());
app.use(bodyParse.json()); // we need this to parse incoming json requests
app.use(express.static('public'));

// routes
app.get('/api/blogs', async (req, res, next) => {
  const { sortBy } = req.query;
  if (!sortBy) {
    const query = 'SELECT * FROM blog_posts';
    const data = await fetchBlogData(query);
    if (data.length > 0) res.status(200).json(data);
    else res.status(404).send('Blog posts not found');
  }
  /* else {
    // sort blogs posts
    const filteredBlogs = blogPosts.filter(blog => blog.tags.includes(sortBy));
    if (filteredBlogs.length > 0) {
      res.status(200).send({ message: `Sorted by '${sortBy}'`, filteredBlogs });
    } else {
      res.status(404).send({ message: 'No such blogs to be sorted' });
    }
  } */
});

app.get('/api/blogs/:id', async (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM blog_posts WHERE id = ?`;
  const data = await fetchBlogData(query, [id]);

  if (data.length > 0)
    res.status(200).json(data[0]);
  else
    res.status(404).send('Blog post not found');
});

app.delete('/api/blogs/:id', async (req, res, next) => {
  const { id } = req.params;
  const query = `DELETE FROM blog_posts WHERE id = ?`;
  const data = await fetchBlogData(query, [id]);
  if (!data) {
    res.status(404).send('Cannot delete blog. Please try again!');
    return;
  } else {
    res.status(200).send();
  }
  
});

app.put('/api/blogs/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, author, content, tags } = req.body;
  const values = [title, author, content, JSON.stringify(tags), id];
  const result = await updateBlogPost(values);
  res.send(result)
});

app.post('/api/blogs', async (req, res, next) => {
  const { title, author, content, tags } = req.body;
  const newBlog = {
    title: title ? title : "",
    author: author ? author : "",
    content: content ? content : "",
    tags: tags ? JSON.stringify(tags) : JSON.stringify([])
  };

  let query = `
    INSERT INTO blog_posts (title, author, content, tags) 
    VALUES (?, ?, ?, ?)`;
  let values = [newBlog.title, newBlog.author, newBlog.content, newBlog.tags];
  const data = await fetchBlogData(query, values);
  if (data) res.status(200).json(data)
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})