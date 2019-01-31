import React from 'react';
import { Nav, NavItem, Tab, Tabs } from 'react-bootstrap';

import { Cast } from './cast';
import { Details } from './details';
import { TabContainer } from './tab-styled';

export const TabDetatils = (props: any) => (
  <TabContainer>
    <Tabs defaultActiveKey={'details'} id="movie-tabs">
      <Nav bsStyle="tabs">       
        <NavItem eventKey="details">
          <span className="glyphicon glyphicon-heart"/>
          Details
        </NavItem>

        <NavItem eventKey="cast">
          <span className="glyphicon glyphicon-heart"/>
          Cast
        </NavItem>

        <NavItem eventKey="crew">
          <span className="glyphicon glyphicon-bookmark"/>
          Crew
        </NavItem>

        <NavItem eventKey="trailers">
          <span className="glyphicon glyphicon-bookmark"/>
          Trailers
        </NavItem>
      </Nav>

      <Tab eventKey={'details'}>
        <Details {...props.details} key={props.details.id}/>
      </Tab>

      <Tab eventKey={'cast'}>
        <Cast persons={props.persons.cast}/>
      </Tab>

      <Tab eventKey={'crew'}>
        <Cast persons={props.persons.crew}/>
      </Tab>
    </Tabs>
  </TabContainer>
);