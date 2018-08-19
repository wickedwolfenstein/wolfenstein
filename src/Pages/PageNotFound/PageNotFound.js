import React from 'react';
import Image from '../../Components/ErrorProofImage/ErrorProofImage';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SEO from '../../Components/SEO/SEO';
const PageNotFound = props => {
  const redirectToHome = () => {
    props.history.push('/');
  };
  return (
    <div style={{ height: '100%' }}>
      <SEO
        title={'Page Not Found'}
        metaTitle={'Wickedity | Page Not Found'}
        metaKeywords={'blog technology science error page'}
        metaDescription={'Blog about all the things I find intresting!!'}
        orgTitle={'Wickedity | Page Not Found'}
        orgDescription={'Blog about all the things I find intresting!!'}
      />
      <Grid
        verticalAlign="middle"
        container
        reversed="tablet vertically mobile"
        doubling
        stackable
        columns={2}
      >
        <Grid.Column>
          <h1>Page has been burned.</h1>
          <br />
          <p>
            <strong>Catfather : </strong>
            You didn't see anything here.. Capiche?!!
          </p>
          <p>
            <strong>Goon 1 : </strong>Click the button below and go
            <strong> home</strong> or you'll be sleepin with the fishes!!
          </p>
          <div className={'textCenterAlign'}>
            <Button onClick={redirectToHome} positive className={'centerAlign'}>
              Home
            </Button>
          </div>
        </Grid.Column>
        <GridColumn>
          <Image
            src={'/themafiagroup.png'}
            className={'catfather'}
            alt={'Catfather and his goons'}
          />
        </GridColumn>
      </Grid>
    </div>
  );
};

export default withRouter(PageNotFound);
