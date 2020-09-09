import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost, updatePost } from '../state/actions/post';
import fetchUsers from '../state/actions/user';


class AppPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      fetchUsers: fetchAction, action, title, body, author,
    } = this.props;
    fetchAction();
    if (action === 'update') this.setState({ title, body, author });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, body, author } = this.state;
    const {
      createPost: create, updatePost: update, action, id, commentsLength, onUpdate,
    } = this.props;
    const post = {
      id,
      title,
      body,
      username: author,
      comments: commentsLength,
    };
    if (action === 'update') {
      update(post);
      onUpdate();
    }
    if (action === 'create') create(post);
    this.setState({ title: '', body: '', author: '' });
  }

  render() {
    const { title, body, author } = this.state;
    const { users } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls">
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              onChange={this.onChange}
              value={title}
              name="title"
              required
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls">
            <input
              type="text"
              className="form-control"
              placeholder="Enter content"
              onChange={this.onChange}
              value={body}
              name="body"
              required
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls">
            <select
              className="form-control"
              onChange={this.onChange}
              value={author}
              name="author"
              required
            >
              <option defaultValue value="" disabled>Select author</option>
              { users.map((user) => (
                <option key={user.id} value={user.username}>{user.name}</option>
              )) }
            </select>
          </div>
        </div>
        <br />
        <div id="success" />
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Post
          </button>
        </div>
      </form>
    );
  }
}

AppPostForm.defaultProps = {
  action: 'create',
  id: null,
  title: '',
  body: '',
  author: '',
  commentsLength: 0,
  onUpdate: () => {},
};

AppPostForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  action: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  commentsLength: PropTypes.number,
  onUpdate: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: state.users.items,
});

export default connect(mapStateToProps, { createPost, updatePost, fetchUsers })(AppPostForm);
