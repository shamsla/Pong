import { RefObject } from 'react'

interface Props {
  paddleRef: RefObject<HTMLDivElement>
}

export default function usePaddleMovement({ paddleRef }: Props) {
  const getPosition = (): number => {
    return parseFloat(getComputedStyle(paddleRef.current!).getPropertyValue('--position'))
  }
  const setPosition = (pos: number) => {
    paddleRef.current!.style.setProperty('--position', pos.toString())
  }

  const getBoundingRect = () => paddleRef.current!.getBoundingClientRect()

  return { setPosition, getBoundingRect, getPosition }
}
