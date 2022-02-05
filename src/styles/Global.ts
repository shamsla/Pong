import { createGlobalStyle } from 'styled-components'

const styles = createGlobalStyle`
*, *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html, body {
    min-height: 100vh;
}

#root {
    min-height: 100vh;
}

body {
    font-family: ${props => props.theme.font.family};
    background-color: ${props => props.theme.colors.bg};
    color: ${p => p.theme.colors.white};
}
button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}
input, textarea { outline: none; border: none;}
.utl__highlight {
    color: ${props => props.theme.colors.primary}
}
`

export default styles
