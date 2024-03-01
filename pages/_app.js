// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import '@mantine/dropzone/styles.css';

import {
  createTheme,
  MantineProvider,
  AppShell,
  Group,
  Burger,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from "@components/layout/sidebar/sidebar";
const theme = createTheme({
  /** Put your mantine theme override here */
});

function Application({ Component, pageProps }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        // header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        {/* <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header> */}
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default Application;
