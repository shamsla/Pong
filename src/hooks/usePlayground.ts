import { RefObject, useEffect, useRef } from 'react'
import useBallMovement from './useBallMovement'
import usePaddleMovement from './usePaddleMovement'

interface Props {
  ballRef: RefObject<HTMLDivElement>
  userPaddleRef: RefObject<HTMLDivElement>
  remotePaddleRef: RefObject<HTMLDivElement>
  playgroundRef: RefObject<HTMLDivElement>
  onUserWin: () => void
  onRemoteWin: () => void
}

export default function usePlayground({
  ballRef,
  userPaddleRef,
  remotePaddleRef,
  playgroundRef,
  onRemoteWin,
  onUserWin,
}: Props) {
  const requestFramesRef = useRef<number>(0)
  const lastTimeRef = useRef<number | null>(null)

  const getPlaygroundRect = () => playgroundRef.current!.getBoundingClientRect()

  const { setPosition: setUserPaddlePosition, getBoundingRect: getUserPaddleRect } = usePaddleMovement({
    paddleRef: userPaddleRef,
    getPlaygroundRect,
  })

  const {
    update: updateBall,
    getBoundingRect: getBallBoundingRect,
    resetMovement: resetBallMovement,
  } = useBallMovement({
    ballRef,
    getPlaygroundRect,
    getUserPaddleRect,
    getRemotePaddleRect: () => remotePaddleRef.current!.getBoundingClientRect(),
  })

  const manageGameStatus = () => {
    const ballRect = getBallBoundingRect()
    const playgroundRect = getPlaygroundRect()

    const isLose = ballRect.right >= playgroundRect.right || ballRect.left <= playgroundRect.left
    if (isLose) {
      const isRemoteLose = ballRect.right >= playgroundRect.right

      if (isRemoteLose) onUserWin()
      else onRemoteWin()

      // reset the ball
      resetBallMovement()
    }
  }

  const update = (time: number) => {
    if (lastTimeRef.current !== null) {
      const delta = time - lastTimeRef.current

      updateBall(delta)
      manageGameStatus()
    }

    lastTimeRef.current = time
    requestFramesRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    requestFramesRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestFramesRef.current)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const paddlePos = (e.y / getPlaygroundRect().height) * 100
      setUserPaddlePosition(paddlePos <= 100 ? paddlePos : 100)
    }

    document.addEventListener('mousemove', handler)

    return () => document.removeEventListener('mousemove', handler)
  }, [])
}
