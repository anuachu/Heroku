import React, { Component } from 'react';

import { getPost, deletePost } from '../api/PostsApi';

class PostDetail extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    getPost(id)
      .then(post => this.setState({ post }))
      .catch(error => {
        console.log('Get post failed!');
        console.log('Error:', error);
      });
  }

  deletePost = async id => {
    try {
      await deletePost(id);
      this.props.history.push('/posts');
    } catch (error) {
      console.log('Delete post failed!');
      console.log('Error:', error);
    }
  }

  render() {
    const { history } = this.props;
    const { id, title, body, author, category } = this.state.post;

    return <div>
      <h5>Post Detail</h5>
      <div className="card bg-light mb-3">
        <div className="card-header">
          <h5>
            {title}
          </h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            {body}
          </p>
          <p className="card-text">Author: <em>
            {author}
          </em></p>
          <p className="card-text">Category: <em>
            {category}
          </em></p>
        </div>
        <div className="card-footer">
          <button className="btn btn-sm btn-outline-info mr-1" type="button" onClick={() => history.goBack()}>Back</button>
          <button className="btn btn-sm btn-outline-primary mr-1" type="button" onClick={() => history.push(`/posts/${id}/edit`)}>Edit</button>
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            onClick={() => this.deletePost(id)}
          >Delete</button>
        </div>
      </div>
    </div>;
  }
}

export default PostDetail;
