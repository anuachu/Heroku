import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePost, getPost } from '../api/PostsApi';
import { getCategories } from '../api/CategoriesApi';
import * as PostActions from '../actions/PostActions';

class PostForm extends Component {

  state = {
    id: 0,
    title: '',
    body: '',
    author: '',
    category: '',

    categories: []
  };

  componentDidMount() {
    this.getCategories();
    this.getPost();
    console.log('PostForm component mounted.');
  }

  componentWillUnmount() {
    console.log('PostForm component got destroyed.');
  }

  getCategories = async () => {
    try {
      const categories = await getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log('Get categories failed.');
      console.log('Error:', error);
    }
  }

  getPost = async () => {
    try {
      const id = this.props.match.params.id;
      if (!id) {
        return;
      }

      const post = await getPost(id);

      this.setState({
        id: post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      });

    } catch (error) {
      console.log('Get post failed.');
      console.log('Error:', error);
    }
  }

  createPost = async () => {
    try {
      const newPost = {
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category
      };

      // dispatch create post action
      this.props.createPost(newPost);

      this.props.history.push('/posts');
    } catch (error) {
      console.log('Create post failed!');
      console.log('Error:', error);
    }
  }

  updatePost = async () => {
    try {
      const post = { ...this.state };
      await updatePost(this.state.id, post);

      this.props.history.push('/posts');
    } catch (error) {
      console.log('Update post failed!');
      console.log('Error:', error);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const id = this.state.id;

    if (id === 0) {
      // Create new post
      this.createPost();
    } else {
      // Update existing post
      this.updatePost();
    }

  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, body, author, category, categories } = this.state;

    return <div>
      <h5>Post Form</h5>

      <div className="card bg-light">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={this.handleChange}
              // onChange={e => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                placeholder="Enter body"
                rows="3"
                cols="30"
                value={body}
                onChange={this.handleChange}
              // onChange={e => this.setState({ body: e.target.value })}
              >
              </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                placeholder="Enter author"
                value={author}
                onChange={this.handleChange}
              // onChange={e => this.setState({ author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                required
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={this.handleChange}
              // onChange={e => this.setState({ category: e.target.value })}
              >
                <option value=""></option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>

    </div>;
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(PostActions.createPost(post))
  }
};

export default connect(null, mapDispatchToProps)(PostForm);
