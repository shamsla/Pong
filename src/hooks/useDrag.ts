import { RefObject, useEffect, useRef } from 'react'

interface Props {
  elementRef: RefObject<HTMLElement>
  onDrag: (e: MouseEvent) => void
}

export default function useDrag({ elementRef, onDrag }: Props) {
  const isReadyToDragRef = useRef(false)

  const onMouseDown = () => {
    isReadyToDragRef.current = true
  }
  const onMouseUp = () => {
    isReadyToDragRef.current = false
  }

  const onMouseMove = (e: MouseEvent) => {
    if (isReadyToDragRef.current) {
      onDrag(e)
    }
  }

  useEffect(() => {
    const element = elementRef.current!

    element.addEventListener('mousedown', onMouseDown, false)
    element.addEventListener('mousemove', onMouseMove, false)
    element.addEventListener('mouseup', onMouseUp, false)

    return () => {
      element.removeEventListener('mousedown', onMouseDown)
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseup', onMouseUp)
    }
  }, [])
}
