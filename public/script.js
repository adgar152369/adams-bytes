import fetchBlogPost from "./blog.js";
const blogsContainer = document.querySelector('#blog-container');

const resetBlogPosts = () => {
  if (blogsContainer) 
    blogsContainer.innerHTML = '';
}

const fetchBlogPosts = async () => {
  try {
    const response = await fetch('/api/blogs');
    const data = await response.json();
    renderBlogPosts(data);
  } catch (error) {
    console.log(error);
  }
}

const renderBlogPosts = blogPosts => {
  resetBlogPosts();
  if (blogPosts.length > 0) {
    blogPosts.forEach((blog) => {
      const newBlog = document.createElement('div');
      newBlog.className = 'single-blog';
      newBlog.innerHTML = `
        <div class="blog">
          <a>
            <h3>${blog.title}</h3>
          </a>
          <p>by ${blog.author}</p>
          <p>${blog.content}</p>
        </div>
      `;
      blogsContainer.appendChild(newBlog);
      newBlog.addEventListener('click', (e) => {
        e.preventDefault();
        fetchBlogPost(blog.id)
      });
    });
  } else {
    blogsContainer.innerHTML = '<p> Your request has returned no blog posts</p>';
  }
}

// START HERE
const renderDOM = (() => {
  document.addEventListener('DOMContentLoaded', fetchBlogPosts);
})()