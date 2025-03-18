import { AppShell, Indicator, NavLink } from '@mantine/core';
import { useContext } from 'react';
import { IconBellFilled } from '@tabler/icons-react';
import { MainContext } from '../../context/MainContext';

export function Navbar({ close }: any) {
  const { navigate } = useContext(MainContext)
  return (
    <AppShell.Navbar p="md" >
      <NavLink
        label="Home"
        onClick={() => { close(); navigate('Home') }}
      />
      <NavLink
        label="Inquiries"
        onClick={() => { close(); navigate('Inquiries') }}
      />
      <NavLink
        label="New"
        onClick={() => { close(); navigate('New') }}
      />
      <NavLink
        label="Search"
        onClick={() => { close(); navigate('Search') }}
      />
      <NavLink
        label="WebApp"
        onClick={() => { close(); navigate('WebHits') }}
      />
      <NavLink
        label="Settings"
        onClick={() => { close(); navigate('Settings') }}
      />
    </AppShell.Navbar>
  );
};