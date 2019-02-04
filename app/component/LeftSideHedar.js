import React from 'react';
import { Icon,Header,Button,Left,Body,Title,Right } from 'native-base';




const LeftSideHedar = () => {
  return (

    <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />

            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
   
  );
}

export { LeftSideHedar }
