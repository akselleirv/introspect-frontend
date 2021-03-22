import { useSpring, animated, ReactSpringHook } from "react-spring"

export function AnimatedCount({
  points,
  animationRef,
}: {
  points: number
  animationRef: any
}) {
  //@ts-ignore
  const countingAnimation = useSpring({
    from: { number: points },
    to: { number: points },
    config: { friction: 100 },
    //ref: animationRef,
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
