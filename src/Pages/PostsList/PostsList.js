import React, { Component, Fragment } from 'react';
import PostList from '../Postlist/PostList';
import SEO from '../../Components/SEO/SEO';

export class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <SEO
          title={'Wickedity | Posts'}
          metaTitle={'Wickedity | Posts'}
          metaKeywords={'blog technology science all categories posts'}
          metaDescription={'Blog about all the things I find intresting!!'}
          orgTitle={'Wickedity | Posts'}
          orgDescription={'Blog about all the things I find intresting!!'}
        />
        <PostList />
      </Fragment>
    );
  }
}
