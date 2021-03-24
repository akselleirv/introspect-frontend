import { useSpring, animated } from "react-spring"

export function AnimatedCount({
  points,
}: {
  points: number
}) {
  const countingAnimation = useSpring({
    from: { number: points },
    to: { number: points },
    config: { friction: 50 },
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
