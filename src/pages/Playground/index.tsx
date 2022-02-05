import usePlayground from 'hooks/usePlayground'
import { useRef, useState } from 'react'
import { FC } from 'react'

import { Wrapper, PlaygroundMain, Players, Player, Paddle, Ball, CenterLine } from './styles'

const Playground: FC = () => {
  const ballRef = useRef<HTMLDivElement>(null)
  const userPaddleRef = useRef<HTMLDivElement>(null)
  const remotePaddleRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  const [userScore, setUserScore] = useState(0)
  const [remoteScore, setRemoteScore] = useState(0)

  const onUserWin = () => setUserScore(prev => prev + 1)
  const onRemoteWin = () => setRemoteScore(prev => prev + 1)

  // core playground logic here
  usePlayground({ ballRef, userPaddleRef, remotePaddleRef, playgroundRef, onUserWin, onRemoteWin })

  return (
    <Wrapper>
      <PlaygroundMain ref={playgroundRef}>
        <Players>
          <Player>
            <p>ShAms : {userScore}</p>
          </Player>
          <Player>
            <p>Remote : {remoteScore}</p>
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
