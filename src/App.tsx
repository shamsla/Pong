import Playground from 'pages/Playground'
import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import Theme from 'styles/Theme'
import GlobalStyles from 'styles/Global'

const App: FC = () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    <Playground />
  </ThemeProvider>
)

export default App
