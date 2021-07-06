import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Categories from './Categories';
import * as PostActions from '../actions/PostActions';

class Posts extends Component {

  componentDidMount() {
    this.props.getPosts();
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
    const { posts, selectedCategory } = this.props;

    const filteredPosts = selectedCategory.id === 'all' ?
      posts : posts.filter(p => p.category === selectedCategory.id);

    return <div className="row">
      <div className="col-md-3">
        <Categories />
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

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    selectedCategory: state.selectedCategory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(PostActions.getPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
