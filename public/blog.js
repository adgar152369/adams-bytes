const renderBlogPost = blog => {
  const blogHeader = document.querySelector('.page-header');
  const blogContainer = document.querySelector('#blog-container');
  const blogEl = document.createElement('div');
  blogHeader.innerHTML = `<h1>${blog.title}</h1><p class="blog-author">${blog.author}</p>`;
  // blogContainer.classList.remove('remove-styles');
  blogContainer.classList.add('remove-styles');
  blogContainer.innerHTML = `
    <p class="blog-content">
      ${blog.content}
    </p>
    <div class="edit-blog">
      <button>Edit</button>
    </div>
  `;

  const editBlogBtn = document.querySelector('.edit-blog button');
  editBlogBtn.addEventListener('click', () => {
    location.href = `new-blog.html?id=${blog.id}`;
  })
}

const fetchBlogPost = async (id) => {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    const data = await response.json();
    renderBlogPost(data);
  } catch (error) {
    console.log(error)
  }
}

export default fetchBlogPost;