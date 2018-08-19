import React, { Component, Fragment } from 'react';
import SEO from '../../Components/SEO/SEO';
import Banner2 from '../../Components/Banner2/Banner2';
import PostList from '../Postlist/PostList';

export class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <SEO
          title={'Wickedity'}
          metaTitle={'Wickedity'}
          metaKeywords={'blog technology science'}
          metaDescription={'Blog about all the things I find intresting!!'}
          orgTitle={'Wickedity'}
          orgDescription={'Blog about all the things I find intresting!!'}
        />
        <Banner2
          className={'wolf'}
          altText={'Banner'}
          headerText={'Wickedity'}
          subheading={'Welcome to my Blog!!'}
        />
        <PostList />
      </Fragment>
    );
  }
}
