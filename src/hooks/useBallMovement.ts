import { RefObject, useEffect, useRef } from 'react'
import { getRandomNumberBetween } from 'utils'

interface Props {
  ballRef: RefObject<HTMLDivElement>
  getPlaygroundRect: () => DOMRect
  getUserPaddleRect: () => DOMRect
  getRemotePaddleRect: () => DOMRect
  maximumVelocity: number
}

export default function useBallMovement({
  ballRef,
  getPlaygroundRect,
  getUserPaddleRect,
  getRemotePaddleRect,
  maximumVelocity,
}: Props) {
  const directionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef(0.1)

  const getX = (): number => {
    return parseFloat(getComputedStyle(ballRef.current!).getPropertyValue('--x'))
  }
  const setX = (x: number) => {
    ballRef.current!.style.setProperty('--x', x.toString())
  }
  const getY = (): number => {
    return parseFloat(getComputedStyle(ballRef.current!).getPropertyValue('--y'))
  }
  const setY = (y: number) => {
    ballRef.current!.style.setProperty('--y', y.toString())
  }

  const getBoundingRect = () => ballRef.current!.getBoundingClientRect()

  const incrementBallVelocity = () => {
    if (velocityRef.current < maximumVelocity) velocityRef.current = velocityRef.current += 0.0008
  }

  const resetMovement = () => {
    setX(50)
    setY(50)

    directionRef.current = { x: 0, y: 0 }

    while (Math.abs(directionRef.current.x) <= 0.2 || Math.abs(directionRef.current.x) >= 0.9) {
      const heading = getRandomNumberBetween(0, 2 * Math.PI)
      directionRef.current = { x: Math.cos(heading), y: Math.sin(heading) }
    }
  }

  const isCollision = (paddleRect: DOMRect, ballRect: DOMRect) => {
    return (
      paddleRect.left <= ballRect.right &&
      paddleRect.right >= ballRect.left &&
      paddleRect.top <= ballRect.bottom &&
      paddleRect.bottom >= ballRect.top
    )
  }

  const update = (delta: number) => {
    setX(getX() + directionRef.current.x * velocityRef.current * delta)
    setY(getY() + directionRef.current.y * velocityRef.current * delta)

    const ballRect = getBoundingRect()
    if (ballRect.bottom >= getPlaygroundRect().bottom || ballRect.top <= getPlaygroundRect().top) {
      directionRef.current = { ...directionRef.current, y: directionRef.current.y * -1 }
    }

    if (ballRect.right >= getPlaygroundRect().right || ballRect.left <= getPlaygroundRect().left) {
      directionRef.current = { ...directionRef.current, x: directionRef.current.x * -1 }
    }

    if (isCollision(getRemotePaddleRect(), ballRect) || isCollision(getUserPaddleRect(), ballRect)) {
      directionRef.current = { ...directionRef.current, x: directionRef.current.x * -1 }
    }
  }

  useEffect(() => {
    resetMovement()
  }, [])

  return { update, getBoundingRect, resetMovement, getY, incrementBallVelocity }
}
