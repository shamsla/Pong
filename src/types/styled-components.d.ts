import Theme from '../styles/Theme'

type CustomTheme = typeof Theme

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
