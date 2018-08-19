import React, { Component, Fragment } from 'react';
import { Card, Button, Header, Divider, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Store from '../../Store/userStore';
import axios from '../../config/Axios/axios';

export class UserPosts extends Component {
  state = {
    posts: [],
    postID: '',
    postDeleteSuccess: false,
    postDeleteError: false,
    confirmDeleteModalOpen: false,
  };
  componentDidMount() {
    if (Store.user.id) {
      axios
        .get('/post/user/' + Store.user.id)
        .then(res => {
          if (res.data) {
            const posts = [...res.data];
            this.setState({
              posts,
            });
          }
        })
        .catch();
    }
  }

  editPost = id => {
    if (id && id !== '') {
      this.props.history.push('/profile/posts/' + id);
    }
  };

  deletePost = id => {
    if (id && id !== '') {
      axios
        .delete('/post/' + id)
        .then(() => {
          this.setState({
            posts: this.state.posts.filter(x => x._id !== id),
            postID: '',
            postDeleteSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              postDeleteSuccess: false,
            });
          }, 5000);
        })
        .catch(() => {
          this.setState({
            postDeleteError: true,
            postID: '',
          });
          setTimeout(() => {
            this.setState({
              postDeleteError: false,
            });
          }, 5000);
        });
    }
  };

  confirmDelete = () => {
    this.deletePost(this.state.postID);
    this.setState({
      confirmDeleteModalOpen: false,
    });
  };

  rejectDelete = () => {
    this.setState({
      confirmDeleteModalOpen: false,
      postID: '',
    });
  };

  openConfirmModal = id => {
    this.setState({
      confirmDeleteModalOpen: true,
      postID: id,
    });
  };

  render() {
    let postsdom = this.state.posts.map(post => {
      return (
        <Card key={post._id} style={{ margin: 'auto' }} className={'cardSpace'}>
          <Card.Content>
            <Card.Header>{post.card.headerText}</Card.Header>
            <Card.Meta>{post.card.extraInfo}</Card.Meta>
            <Card.Meta>
              {post.category.charAt(0).toUpperCase() +
                post.category.substr(1).toLowerCase()}
            </Card.Meta>
            <Card.Description>{post.card.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                compact
                basic
                color="green"
                size="small"
                onClick={() => this.editPost(post._id)}
              >
                Edit Post
              </Button>
              <Button
                compact
                basic
                color="red"
                size="small"
                onClick={() => this.openConfirmModal(post._id)}
              >
                Delete Post
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    });
    return (
      <Fragment>
        <Header
          as="h1"
          className={'post-list'}
          content="My Posts"
          subheader="On this page you can edit posts."
        />
        <Divider hidden />
        {this.state.postDeleteSuccess || this.state.postDeleteError ? (
          <Fragment>
            <Message
              positive={this.state.postDeleteSuccess}
              negative={this.state.postDeleteError}
            >
              <Message.Header>
                {this.state.postDeleteSuccess
                  ? 'Post Deleted Successfully.'
                  : ''}
                {this.state.postDeleteError ? "Couldn't Delete Post." : ''}
              </Message.Header>
            </Message>
            <Divider hidden />
          </Fragment>
        ) : (
          ''
        )}
        <Divider hidden />
        <Card.Group itemsPerRow={3} doubling stackable>
          {postsdom}
        </Card.Group>
      </Fragment>
    );
  }
}

export default withRouter(UserPosts);
