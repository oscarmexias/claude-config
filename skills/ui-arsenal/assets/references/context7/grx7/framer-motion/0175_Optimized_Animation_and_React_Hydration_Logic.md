# Optimized Animation and React Hydration Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-block.html

Implements a React component using Framer Motion that renders on the server and hydrates on the client. It utilizes startOptimizedAppearAnimation for hardware-accelerated transitions and includes a main-thread blocking simulation to test animation robustness during hydration.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion 
const { matchViewportBox } = window.Assert 
const root = document.getElementById("root") 
const duration = 4 
const x = motionValue(0) 
const xTarget = 500 
let isFirstFrame = true 

// This is the tree to be rendered server and client-side.
const Component = React.createElement(motion.div, {
	id: "box",
	initial: { x: 0, opacity: 0 },
	animate: { x: xTarget, opacity: 1 },
	transition: { duration, ease: "linear" },
	style: { x },
	/** On animation start, check the values we expect to see here */
	onAnimationStart: () => {
		const box = document.getElementById("box")
		box.style.backgroundColor = "green"
		setTimeout(() => {
			frame.postRender(() => {
				/** The frame visible after the infinite loop and before motion renders again */
				frame.preRender(() => {
					const left = box.getBoundingClientRect().left
					if (left < 200) {
						showError(document.getElementById("box"), `Stutter detected`)
					}
				})
			})
			/** By blocking the main thread here, we ensure that the keyframes are resolved a good duration after the animation was initialised. */
			frame.postRender(() => {
				console.log("Blocking main thread before keyframe resolution")
				const startTime = performance.now()
				while (performance.now() - startTime < 1000) {}
			})
			/** This animation interrupts the optimised animation. */
			const options = { duration: 0.5, ease: "linear" }
			let frameCounter = 0
			box.style.backgroundColor = "red"
			animate(box, { scale: [1, 1] }, {
				...options,
				onUpdate: () => {
					frameCounter++
					console.log(getComputedStyle(box).transform, box.style.transform, box.getBoundingClientRect().left)
				},
			})
		}, 100)
	},
	[optimizedAppearDataAttribute]: "a",
	children: "Content",
})

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)

// Start optimised opacity animation
startOptimizedAppearAnimation(document.getElementById("box"), "opacity", [0, 1], {
	duration: duration * 1000,
	ease: "linear",
})

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
	document.getElementById("box"),
	"transform",
	["translateX(0px)", `translateX(${xTarget}px)`],
	{
		duration: duration * 1000,
		ease: "linear",
	},
	(animation) => {
		setTimeout(() => {
			ReactDOM.hydrateRoot(root, Component)
		}, (duration * 1000) / 4)
	}
)
```

--------------------------------