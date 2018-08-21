import React, { Component, Fragment } from 'react';
import { Grid, Icon, Card, Segment } from 'semantic-ui-react';
import ErrorProofImage from '../../Components/ErrorProofImage/ErrorProofImage';
import { NavLink } from 'react-router-dom';
import instance from '../../config/Axios/axios';
import { randomColor } from '../../Components/Colors/Colors';
import SEO from '../../Components/SEO/SEO';
import OnVisible from 'react-on-visible';

export class Postlist extends Component {
  state = {
    posts: [],
    selectedCategory: '',
  };
  categories = [];

  componentWillMount() {
    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.category &&
      this.props.match.params.category !== ''
    ) {
      this.setState({
        selectedCategory: this.props.match.params.category,
      });
    }
  }

  componentDidMount() {
    const cardsCount = window.innerWidth > 992 ? 3 : 2;
    instance.get('/category').then(res => {
      if (res.data) {
        this.categories = res.data.map(item => {
          return {
            key: item.key,
            text: item.text,
            value: item.value,
          };
        });
      }
      instance
        .get('/post')
        .then(res => {
          if (res.data) {
            const posts = [...res.data];
            let catagorizedPosts = [];
            let categoryArr = [];
            if (
              this.state.selectedCategory &&
              this.state.selectedCategory !== ''
            ) {
              const selectedCat = this.categories.filter(
                x => x.value === this.state.selectedCategory
              );
              if (selectedCat && selectedCat[0]) {
                categoryArr = posts.filter(
                  x => x.category === selectedCat[0].value
                );
                catagorizedPosts.push({
                  [selectedCat[0].text]: [
                    ...this.groupIntoChunks(categoryArr, cardsCount),
                  ],
                });
              }
            } else {
              this.categories.forEach(element => {
                categoryArr = posts.filter(x => x.category === element.value);
                if (categoryArr.length > 0) {
                  catagorizedPosts.push({
                    [element.text]: [
                      ...this.groupIntoChunks(categoryArr, cardsCount),
                    ],
                  });
                }
              });
            }
            this.setState({
              posts: catagorizedPosts,
            });
          }
        })
        .catch();
    });
  }

  groupIntoChunks = (arr, chunkSize) => {
    var R = [];
    for (var i = 0; i < arr.length; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  };

  render() {
    let postsDom = null;
    if (this.state.posts) {
      postsDom = this.state.posts.map(item => {
        const categoryText = Object.keys(item)[0];
        return item[categoryText].map((chunks, index) => {
          return (
            <Fragment key={Math.random() * 500000}>
              {index === 0 ? (
                <Grid.Row columns={1} stretched>
                  <Grid.Column>
                    <OnVisible visibleClassName={'come-in-even'} percent={1}>
                      <Segment
                        textAlign="center"
                        raised
                        color={randomColor()}
                        size="large"
                        className={'come-in-even'}
                      >
                        <h3>{categoryText}</h3>
                      </Segment>
                    </OnVisible>
                  </Grid.Column>
                </Grid.Row>
              ) : null}
              <Grid.Row>
                {chunks.map((post, index) => {
                  let postUrl = null;
                  if (
                    post.title &&
                    post.category &&
                    post.category !== '' &&
                    post.title !== ''
                  ) {
                    const postName = post.title
                      .toLowerCase()
                      .replace(/[^a-z\s]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/(^-+?)|(-+?$)/g, '');
                    postUrl =
                      '/posts/' +
                      post.category +
                      '/' +
                      post._id +
                      '/' +
                      postName;
                  }
                  return (
                    <Grid.Column
                      computer={5}
                      tablet={8}
                      mobile={16}
                      key={post._id}
                      style={{ margin: 'auto' }}
                    >
                      <OnVisible
                        visibleClassName={
                          index % 2 === 0
                            ? 'come-in-even clickable'
                            : 'come-in-odd clickable'
                        }
                        percent={1}
                      >
                        <NavLink className="anchor-clickable" to={postUrl} />
                        <Card centered>
                          <ErrorProofImage src={post.card.cardImage} />
                          <Card.Content>
                            <Card.Header>{post.card.headerText}</Card.Header>
                            <Card.Meta>
                              <span className={post.card.subheaderClass}>
                                {post.card.subheaderText}
                              </span>
                            </Card.Meta>
                            <Card.Description>
                              {post.card.description}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <a>
                              <Icon name={post.card.extraInfoIcon} />
                              {post.card.extraInfo}
                            </a>
                          </Card.Content>
                        </Card>
                      </OnVisible>
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Fragment>
          );
        });
      });
    }

    return (
      <Grid className={'gridpushup'}>
        <Grid.Row columns={3}>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
          <Grid.Column
            mobile={16}
            tablet={12}
            computer={10}
            className={'create-post-editor'}
          >
            <Grid className={'post-list'}>{postsDom}</Grid>
          </Grid.Column>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Postlist;
