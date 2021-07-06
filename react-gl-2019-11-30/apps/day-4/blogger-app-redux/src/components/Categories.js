import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categoryAll } from './store';
import { getCategories } from '../api/CategoriesApi';
import { selectCategory } from '../actions/CategoryActions';

class Categories extends Component {
  state = {
    categories: []
  }

  async componentDidMount() {
    try {
      const categories = await getCategories();
      this.setState({ categories: categories });
    } catch (error) {
      console.log('Get categories failed!');
      console.log('Error:', error);
    }
  }

  render() {
    const categoriesWithAll = [categoryAll, ...this.state.categories];
    return <div>
      <h5>Categories</h5>

      <div className="list-group">
        {categoriesWithAll.map(
          c => <button
            type="button"
            key={c.id}
            className="list-group-item list-group-item-action"
            onClick={() => this.props.selectCategory(c)}
          >{c.name}</button>
        )}
      </div>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category) => dispatch(selectCategory(category))
  };
}

export default connect(null, mapDispatchToProps)(Categories);