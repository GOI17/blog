import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../state/actions/post';
import AppPostCard from './postcard';

const AppPosts = ({ posts }) => {
  if (posts.length > 0) {
    return (
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <AppPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              username={post.username}
              commentsLength={post.comments}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col mx-auto text-center">
          <h3>No posts</h3>
        </div>
      </div>
    </div>
  );
};

AppPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

export default connect(mapStateToProps, fetchPosts)(AppPosts);
