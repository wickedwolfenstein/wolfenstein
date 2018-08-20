import React, { Component, Fragment } from 'react';
import api from '../../config/Axios/axios';
import Image from '../../Components/ErrorProofImage/ErrorProofImage';
import OnVisible from 'react-on-visible';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  PinterestIcon,
  EmailIcon,
} from 'react-share';
import Disqus from 'disqus-react';
import { Grid, Divider, Loader, Dimmer, Card } from 'semantic-ui-react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'font-awesome/css/font-awesome.css';
import { withRouter } from 'react-router-dom';
import RelatedPosts from '../../Components/RelatedPosts/RelatedPosts';
import { FooterPages } from '../FooterPages/FooterPages';
import SEO from '../../Components/SEO/SEO';
export class ViewPost extends Component {
  state = {
    content: '',
    category: '',
    postId: '',
    postTitle: '',
    post: null,
    loadingPost: true,
  };

  componentDidMount() {
    if (
      (((this.props || {}).match || {}).params || {}).category &&
      (((this.props || {}).match || {}).params || {}).postId &&
      //(((this.props || {}).match || {}).params || {}).postTitle &&
      this.props.match.params.category !== '' &&
      this.props.match.params.postId !== ''
      //this.props.match.params.postTitle !== ''
    ) {
      this.getPost(this.props);
    } else {
      for (const prop in FooterPages) {
        if (this.props.location.pathname === FooterPages[prop].pageURL) {
          api
            .get('/post/' + FooterPages[prop].pageID)
            .then(res => {
              if (res.data && res.data.content && res.data.content !== '') {
                this.setState({
                  content: res.data.content,
                  loadingPost: false,
                });
              }
            })
            .catch(() => {
              const { history } = this.props;
              history.push({
                pathname: '/404',
              });
            });
        }
      }
    }
  }
  componentWillReceiveProps(newprops) {
    if (
      (((newprops || {}).match || {}).params || {}).category &&
      (((newprops || {}).match || {}).params || {}).postId &&
      //(((this.props || {}).match || {}).params || {}).postTitle &&
      newprops.match.params.category !== '' &&
      newprops.match.params.postId !== ''
      //this.props.match.params.postTitle !== ''
    ) {
      this.getPost(newprops);
    } else {
      console.log(newprops.location);
    }
  }

  getPost = props => {
    if (
      (((props || {}).match || {}).params || {}).category &&
      (((props || {}).match || {}).params || {}).postId &&
      //(((this.props || {}).match || {}).params || {}).postTitle &&
      props.match.params.category !== '' &&
      props.match.params.postId !== ''
      //this.props.match.params.postTitle !== ''
    ) {
      api
        .get('/post/' + props.match.params.postId)
        .then(res => {
          if (res.data && res.data.content && res.data.content !== '') {
            this.setState({
              post: res.data,
              content: res.data.content,
              category: props.match.params.category,
              postId: props.match.params.postId,
              postTitle: res.data.title,
              loadingPost: false,
            });
          }
        })
        .catch(() => {
          const { history } = this.props;
          history.push({
            pathname: '/404',
          });
        });
    }
  };

  updatePostHandler = () => {
    //this.componentDidMount();
  };

  render() {
    const disqusShortname = 'wickedity';
    let disqusConfig = undefined;
    if (
      this.state.postId &&
      this.state.postId !== '' &&
      this.state.postTitle &&
      this.state.postTitle !== ''
    ) {
      disqusConfig = {
        url: window.location.href,
        identifier: this.state.postId,
        title: this.state.postTitle,
      };
    }
    return (
      <Fragment key={this.props.match.params.postId}>
        {this.state.post ? (
          <SEO
            title={this.state.post.title}
            metaTitle={this.state.post.title}
            metaKeywords={this.state.post.keywords}
            metaDescription={this.state.post.card.description}
            orgTitle={this.state.post.title}
            orgDescription={this.state.post.card.description}
          />
        ) : (
          ''
        )}
        <Grid
          verticalAlign="middle"
          container
          reversed="tablet vertically mobile"
          doubling
          stackable
          columns={2}
        >
          <Dimmer active={this.state.loadingPost}>
            <Loader
              active={this.state.loadingPost}
              size="huge"
              inline="centered"
            >
              Loading..
            </Loader>
          </Dimmer>
          <Grid.Column>
            {this.state.post ? (
              <Fragment>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.card.description}</p>
                <h3>{'By ' + this.state.post.author}</h3>
                <p className="postEditedTime">
                  {this.state.post.card.extraInfo}
                </p>
              </Fragment>
            ) : (
              undefined
            )}
          </Grid.Column>
          <Grid.Column>
            {this.state.post ? (
              <Image
                src={this.state.post.card.cardImage}
                className={'catfather'}
                alt={this.state.post.title}
              />
            ) : (
              <svg className="placeholder" width="100%" height="100%" />
            )}
          </Grid.Column>
        </Grid>
        <Grid className={'gridpushup'}>
          <Grid.Row>
            <Grid.Column tablet={2} computer={3} only="computer tablet">
              <OnVisible
                visibleClassName={'socialShareAnimation'}
                style={{ position: 'sticky', top: '10%' }}
                percent={25}
              >
                <div className={'socialShareButtons'}>
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={48} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={48} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={48} round />
                  </WhatsappShareButton>
                  <PinterestShareButton
                    url={window.location.href}
                    media={
                      this.state.post
                        ? this.state.post.card.cardImage
                        : '/0.png'
                    }
                  >
                    <PinterestIcon size={48} round />
                  </PinterestShareButton>
                  <RedditShareButton url={window.location.href}>
                    <RedditIcon size={48} round />
                  </RedditShareButton>
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon size={48} round />
                  </EmailShareButton>
                </div>
              </OnVisible>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={12}
              computer={10}
              className={'create-post-editor'}
            >
              <Divider hidden />
              <FroalaEditorView model={this.state.content} />
              <Divider section hidden />
              <div className="textCenterAlign hideOnTabAbove">
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={48} round />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={48} round />
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon size={48} round />
                </WhatsappShareButton>
                <PinterestShareButton
                  url={window.location.href}
                  media={
                    this.state.post ? this.state.post.card.cardImage : '/0.png'
                  }
                >
                  <PinterestIcon size={48} round />
                </PinterestShareButton>
                <RedditShareButton url={window.location.href}>
                  <RedditIcon size={48} round />
                </RedditShareButton>
                <EmailShareButton url={window.location.href}>
                  <EmailIcon size={48} round />
                </EmailShareButton>
              </div>
              {disqusConfig ? (
                <Fragment>
                  <Disqus.CommentCount
                    shortname={disqusShortname}
                    config={disqusConfig}
                  >
                    Comments
                  </Disqus.CommentCount>
                  <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                  />
                </Fragment>
              ) : (
                ''
              )}
              {this.state.category ? (
                <RelatedPosts
                  category={this.state.category}
                  updatePostHandler={this.updatePostHandler}
                  currPostID={this.state.postId}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column tablet={2} computer={3} only="computer tablet" />
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default withRouter(ViewPost);
