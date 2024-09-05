const { connection } = require('./database');

const fetchBlogData = (query, values = null) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        console.log('Error fetching blog post(s):', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const updateBlogPost = (values) => {
  const query = `
    UPDATE blog_posts 
    SET title = ?, author = ?, content = ?, tags = ? 
    WHERE id = ?`;

  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log('Error updating blog post:', err);
        reject(err);
      }
      console.log('Blog post updated:', result);
      resolve(result);
    });
  })

};

const seedBlogs = () => {
  const blogs = [];
  blogs.push(
    {
      id: 1,
      title: "Title 1",
      author: "Adam Garcia",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["basics", "test1", "adam"]
    },
    {
      id: 2,
      title: "Title 2",
      author: "Taryn Garcia",
      content: "Lorem ipsum odor amet, consectetuer adipiscing elit. Volutpat habitasse vivamus platea gravida commodo praesent erat erat. Maecenas dapibus taciti fermentum in justo aliquet et. Lacinia finibus ut cras tellus inceptos proin duis. Integer id velit hac maecenas blandit tempor. Conubia quam pretium netus potenti nunc vel. Quisque dis quisque eleifend blandit efficitur libero platea tortor aptent. Aliquet mi diam tristique, conubia habitant sociosqu.",
      tags: ["basics", "test2", "taryn"]
    },
    {
      id: 3,
      title: "Title 3",
      author: "Javier Garcia",
      content: "Lorem ipsum odor amet, consectetuer adipiscing elit. Risus sagittis vel risus magnis porttitor magnis primis quis. Elit senectus platea dignissim augue cubilia per pretium aenean torquent. Dui euismod condimentum odio; tempus in vel eu condimentum cubilia. Class netus condimentum vel cras est. Vulputate fames eleifend facilisi massa viverra finibus integer ridiculus. Elementum mollis vulputate posuere turpis libero, amet ridiculus. Curabitur tempus lectus adipiscing ut phasellus?",
      tags: ["basics", "test3", "javier"]
    },
  );

  return blogs;
}

module.exports = { seedBlogs, fetchBlogData, updateBlogPost }