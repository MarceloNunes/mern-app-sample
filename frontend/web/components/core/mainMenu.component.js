import React from 'react';
import { Menu, Dropdown, Container, Icon, Image } from 'semantic-ui-react'
import CurrentSessionDropdown from './currentSessionDropdown.component';

export const MainMenu = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as='a' header>
        <Icon name="sidebar" size="big"/>
        MERN Sample App
      </Menu.Item>
      <Dropdown item simple text='Dropdown'>
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className='dropdown icon' />
            <span className='text'>Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <CurrentSessionDropdown />
    </Container>
  </Menu>
);

export default MainMenu;