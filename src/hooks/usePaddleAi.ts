import { useRef } from 'react'

interface Props {
  getBallPosition: () => number
  updatePaddlePosition: (position: number) => void
  getPaddlePosition: () => number
}

export default function usePaddleAi({ getBallPosition, getPaddlePosition, updatePaddlePosition }: Props) {
  const paddleSpeedRef = useRef(0.012)
  const update = (delta: number) => {
    const position = paddleSpeedRef.current * delta * (getBallPosition() - getPaddlePosition())

    updatePaddlePosition(getPaddlePosition() + position)
  }

  return { update }
}
