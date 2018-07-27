import React from 'react'
import { Menu, Dropdown, Image } from 'semantic-ui-react'

const trigger = (
  <span>
    <Image avatar src="http://marcelonunes.net/photo.jpeg" /> Marcelo
  </span>
);

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
];

const CurrentSessionDropdown = () => (
  <Menu.Menu position="right">
    <Menu.Item>
      <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
    </Menu.Item>
  </Menu.Menu>
)

export default CurrentSessionDropdown;