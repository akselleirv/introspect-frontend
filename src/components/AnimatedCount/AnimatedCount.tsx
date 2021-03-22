import { useSpring, animated } from "react-spring"

export function AnimatedCount({
  points,
}: {
  points: number
}) {
  //@ts-ignore
  const countingAnimation = useSpring({
    from: { number: points },
    to: { number: points },
    config: { friction: 100 },
  })

  return (
    <animated.span>
      {/*@ts-ignore */}
      {countingAnimation.number.interpolate((number: number) =>
        Math.floor(number)
      )}
    </animated.span>
  )
}
