import React from 'react';
import Image from '../../Components/ErrorProofImage/ErrorProofImage';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SEO from '../../Components/SEO/SEO';
const ErrorPage = props => {
  const redirectToHome = () => {
    props.history.push('/');
  };
  return (
    <div style={{ height: '100%' }}>
      <SEO
        title={'Error occurred'}
        metaTitle={'Wickedity | Error Page'}
        metaKeywords={'blog technology science error page'}
        metaDescription={'Blog about all the things I find intresting!!'}
        orgTitle={'Wickedity | Error Page'}
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
          <p>
            <strong>Catfather</strong> trashed our place, because we didn't pay
            up. Don't worry! we'll get this sorted out.. kinda.. we hope so..
            I'm scared. If you are scared too, you can use the button below to
            go home where you'll be safe.
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

export default withRouter(ErrorPage);
