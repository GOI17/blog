import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../state/actions/post';
import AppPostForm from './postform';

class AppPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  }

  render() {
    const { edit } = this.state;
    const {
      id, title, body, username, commentsLength, deletePost: deleteAction,
    } = this.props;

    if (edit) {
      return (
        <div className="col-lg-4 col-md-6 mx-auto">
          <div className="card pr-3 pl-3 mb-2 post-preview">
            <button
              className="btn"
              type="button"
              onClick={this.onUpdate}
            >
              Close edit form
            </button>
            <AppPostForm
              action="update"
              id={id}
              title={title}
              body={body}
              author={username}
              commentsLength={commentsLength}
              onUpdate={this.onUpdate}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="col-lg-4 col-md-6 mx-auto">
        <div className="card pr-3 pl-3 mb-2 post-preview">
          <h2 className="post-title">
            { title }
          </h2>
          <h3 className="post-subtitle">
            { body }
          </h3>
          <p className="post-meta">
            Posted by
            {' '}
            <strong>{ username }</strong>
            {' '}
            on September 24, 2019
          </p>
          <p style={{ textAlign: 'end' }} className="post-meta">
            { commentsLength }
            {' '}
            Comments
          </p>
          <div className="row">
            <button className="col btn btn-primary" type="button" onClick={this.onUpdate}>Edit</button>
            <button className="col btn btn-danger" type="button" onClick={() => deleteAction(id)}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

AppPostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  commentsLength: PropTypes.number.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(AppPostCard);
