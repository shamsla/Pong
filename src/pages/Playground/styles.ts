import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  user-select: none;
`
export const PlaygroundMain = styled.div<{ isRightRed: boolean; isLeftRed: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 570px;

  background: #00b563;

  border: 4px solid rgba(255, 255, 255, 0.4);
  position: relative;
  padding: 12px;

  ${p => (p.isRightRed ? 'border-right-color: red;' : '')}
  ${p => (p.isLeftRed ? 'border-left-color: red;' : '')}
`

export const Players = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;
`
export const Player = styled.div`
  p {
    font-size: 60px;
    color: rgba(255, 255, 255, 0.4);
  }
`
export const Paddle = styled.div<{ position: 'left' | 'right' }>`
  --position: 50;
  top: calc(var(--position) * 1%);
  transform: translateY(calc(var(--position) * -1%));

  border-radius: 3px;
  position: absolute;
  height: 75px;
  width: 12px;
  background: ${p => p.theme.colors.white};
  ${p => (p.position === 'left' ? 'left: 2px;' : 'right: 2px;')}
`
export const Ball = styled.div`
  --x: 50;
  --y: 50;

  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  transform: translate(calc(var(--x) * -1%), calc(var(--y) * -1%));
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background: #963c48;
`
export const CenterLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-left: 2px dashed rgba(255, 255, 255, 0.4);
  border-right: 2px dashed rgba(255, 255, 255, 0.4);
`
