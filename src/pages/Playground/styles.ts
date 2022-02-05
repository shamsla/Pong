import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`
export const PlaygroundMain = styled.div`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 600px;
  min-height: 400px;
  min-width: 600px;

  border: 4px solid ${p => p.theme.colors.white};
  position: relative;
  padding: 12px;
`

export const Players = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Player = styled.div`
  p {
    font-size: 30px;
  }
`
export const Paddle = styled.div<{ position: 'left' | 'right' }>`
  --position: 50;
  top: calc(var(--position) * 1%);
  transform: translateY(calc(var(--position) * -1%));

  position: absolute;
  height: 13%;
  width: 12px;
  background: ${p => p.theme.colors.white};
  ${p => (p.position === 'left' ? 'left: 12px;' : 'right: 12px;')}
`
export const Ball = styled.div`
  --x: 50;
  --y: 50;

  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  transform: translate(calc(var(--x) * -1%), calc(var(--y) * -1%));

  width: 20px;
  height: 20px;
  background: ${p => p.theme.colors.white};
`
export const CenterLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-left: 2px dashed ${p => p.theme.colors.white};
  border-right: 2px dashed ${p => p.theme.colors.white};
`
