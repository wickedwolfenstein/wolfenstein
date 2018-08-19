import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

function SEO(props) {
  const {
    title,
    metaTitle,
    metaKeywords,
    metaDescription,
    metaImage,
    orgTitle,
    orgDescription,
    orgImage,
  } = props;

  return (
    <Helmet>
      <title>{title}</title>
      {metaTitle && <meta name="title" content={metaTitle} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaImage && <meta name="image" content={metaImage} />}
      {orgTitle && <meta property="og:title" content={orgTitle} />}
      {orgDescription && (
        <meta property="og:description" content={orgDescription} />
      )}
      {orgImage && <meta property="og:image" content={orgImage} />}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SEO;
