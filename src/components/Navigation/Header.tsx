import { useComputedColorScheme, AppShell, useMantineTheme, Title, Grid, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Logo from '../../assets/Logo';

export function Header({ setOpened, opened }: any) {
  const computedColorScheme = useComputedColorScheme()
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  return (
    <AppShell.Header>
      <Grid grow justify='space-between' align='center' className={mobile ? 'pad-left pad-above' : 'pad-left-md pad-above-md'}>
      <Grid.Col span={mobile ? 1 : 0}><Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" /></Grid.Col>
        <Grid.Col span={mobile ? 4 : 1}><div><Logo colorScheme={computedColorScheme} /></div></Grid.Col>
        <Grid.Col span={mobile ? 6 : 9}><Title order={mobile ? 4 : 1} className='line-height-normal'>Home Repair {mobile ? 'Admin' : 'Administration'}</Title></Grid.Col>
      </Grid>
    </AppShell.Header>
  );
};
