import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categories from './Categories';
import { getPosts } from '../api/PostsApi';

import { categoryAll } from './store';

class Posts extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      selectedCategory: categoryAll
    };
  }

  componentDidMount() {
    getPosts()
      .then(posts => this.setState({ posts: posts }))
      .catch(error => {
        console.log('Get posts failed.');
        console.log('Error:', error);
      });
  }

  handleCategorySelect = category => {
    this.setState({ selectedCategory: category });
  }

  handleDeletePost = postId => {
    this.setState((prevState) => {
      return {
        posts: prevState.posts.filter(p => p.id !== postId)
      };
    });
  }

  renderPosts(filteredPosts) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(p => <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.author}</td>
            <td>{p.category}</td>
            <td>
              <div className="btn-group btn-sm">
                <Link className="btn btn-info" to={`/posts/${p.id}`}>View</Link>
                <Link className="btn btn-primary" to={`/posts/${p.id}/edit`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => this.handleDeletePost(p.id)}>Delete</button>
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
    );
  }

  render() {
    const { posts, selectedCategory } = this.state;

    const filteredPosts = selectedCategory.id === 'all' ?
      posts : posts.filter(p => p.category === selectedCategory.id);

    return <div className="row">
      <div className="col-md-3">
        <Categories onCategorySelect={this.handleCategorySelect} />
      </div>
      <div className="col-md-9">
        <h5>Posts (Category: {selectedCategory.name})</h5>
        {
          filteredPosts.length > 0
            ? this.renderPosts(filteredPosts)
            : <div className="alert alert-info">No posts for the selected category.</div>
        }
      </div>
    </div>;
  }

}

export default Posts;
