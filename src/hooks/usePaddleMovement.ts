import { RefObject, useEffect, useRef } from 'react'
import { getRandomNumberBetween } from 'utils'

interface Props {
  paddleRef: RefObject<HTMLDivElement>
  getPlaygroundRect: () => DOMRect
}

export default function usePaddleMovement({ paddleRef, getPlaygroundRect }: Props) {
  const positionRef = useRef(50)
  const velocityRef = useRef(0.04)

  const getPosition = (): number => {
    return parseFloat(getComputedStyle(paddleRef.current!).getPropertyValue('--position'))
  }
  const setPosition = (pos: number) => {
    paddleRef.current!.style.setProperty('--position', pos.toString())
  }

  const getBoundingRect = () => paddleRef.current!.getBoundingClientRect()

  const update = (delta: number) => {}

  return { update, setPosition, getBoundingRect }
}
