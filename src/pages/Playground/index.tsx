import usePlayground from 'hooks/usePlayground'
import { useEffect, useRef, useState } from 'react'
import { FC } from 'react'

import { Wrapper, PlaygroundMain, Players, Player, Paddle, Ball, CenterLine } from './styles'

const Playground: FC = () => {
  const ballRef = useRef<HTMLDivElement>(null)
  const userPaddleRef = useRef<HTMLDivElement>(null)
  const remotePaddleRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  const [userScore, setUserScore] = useState(0)
  const [remoteScore, setRemoteScore] = useState(0)

  const [isUserLose, setIsUserLose] = useState(true)
  const [isRemoteLose, setIsRemoteLose] = useState(true)

  const onUserWin = () => {
    setIsRemoteLose(true)
    setUserScore(prev => prev + 1)
  }
  const onRemoteWin = () => {
    setIsUserLose(true)
    setRemoteScore(prev => prev + 1)
  }

  // core playground logic here
  usePlayground({ ballRef, userPaddleRef, remotePaddleRef, playgroundRef, onUserWin, onRemoteWin })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isUserLose) {
      timeout = setTimeout(() => setIsUserLose(false), 500)
    }

    return () => clearTimeout(timeout)
  }, [isUserLose])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isRemoteLose) {
      timeout = setTimeout(() => setIsRemoteLose(false), 500)
    }

    return () => clearTimeout(timeout)
  }, [isRemoteLose])

  return (
    <Wrapper>
      <PlaygroundMain isRightRed={isRemoteLose} isLeftRed={isUserLose} ref={playgroundRef}>
        <Players>
          <Player>
            <p>{userScore}</p>
          </Player>
          <Player>
            <p>{remoteScore}</p>
          </Player>
        </Players>

        <CenterLine></CenterLine>

        <Paddle ref={userPaddleRef} position="left"></Paddle>
        <Paddle ref={remotePaddleRef} position="right"></Paddle>
        <Ball ref={ballRef}></Ball>
      </PlaygroundMain>
    </Wrapper>
  )
}

export default Playground
