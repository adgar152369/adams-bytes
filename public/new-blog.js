const newBlogBtn = document.querySelector("#create-blog-post-btn");

const updateBlog = oldBlog => {
  const titleInput = document.querySelector('input#title');
  const authorInput = document.querySelector('input#author');
  const bodyInput = document.querySelector('textarea#content');
  newBlogBtn.removeEventListener('click', createNewBlog);
  newBlogBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const blogData = {
      id: oldBlog.id,
      title: titleInput.value,
      author: authorInput.value,
      content: bodyInput.value,
      tags: oldBlog.tags
    }
    await fetch(`/api/blogs/${blogData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    alert('blog saved!');
  });
}

const fetchBlogData = async (id) => {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    const blog = await response.json();
    // Populate the form with the blog data
    document.querySelector('input#title').value = blog.title;
    document.querySelector('input#author').value = blog.author;
    document.querySelector('textarea#content').value = blog.content;
    updateBlog(blog);
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
}

const deleteBlogPost = async (id) => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      alert('Blog deleted successfully');
      window.location.replace('/'); // Redirect to the homepage
    }
  } catch (error) {
    console.log(error);
  }
}

const createBtns = (id) => {
  const functionBtns = document.querySelector('.blog-function-btns');
  const deleteBlogBtn = document.createElement('button');

  functionBtns.innerHTML = '';
  deleteBlogBtn.textContent = "Delete"
  deleteBlogBtn.className = "delete-blog-btn";
  newBlogBtn.textContent = "Save";
  newBlogBtn.className = "save-blog-btn";
  deleteBlogBtn.addEventListener('click', (e) => {
    deleteBlogPost(id);
  });

  functionBtns.appendChild(newBlogBtn);
  functionBtns.appendChild(deleteBlogBtn);
}

const checkExistingBlog = (() => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  const deleteBlogBtn = document.querySelector('.delete-blog-btn');
  if (deleteBlogBtn) {
    deleteBlogBtn.remove();
  }

  if (blogId) {
    createBtns(blogId);
    fetchBlogData(blogId);
  }
})();

const createNewBlog = async (e) => {
  const titleInput = document.querySelector('input#title');
  const authorInput = document.querySelector('input#author');
  const bodyInput = document.querySelector('textarea#content');
  newBlogBtn.textContent = "Create";
  newBlogBtn.className = "";
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": titleInput.value,
        "author": authorInput.value,
        "content": bodyInput.value,
        "tags": []
      })
    });
    if (response.ok) {
      alert('Blog created successfully');
      window.location.replace('/'); // Redirect to the homepage
    } else {
      alert('Error creating blog');
    }
  } catch (error) {

  }
}

newBlogBtn.addEventListener('click', createNewBlog);