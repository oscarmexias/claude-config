# Styling Elements for Framer Motion Layout Testing with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-parent-child-static-grandchild.html

This CSS defines initial styles for parent, child, and grandchild elements, as well as a '.b' class that modifies the parent and child dimensions and positioning. It also includes a rule to visually highlight elements where layout correction might be incorrect and an off-screen element to trigger overflow.

```css
body { padding: 0; margin: 0; }
#parent { width: 100px; height: 100px; background-color: #00cc88; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#parent.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; display: flex; justify-content: flex-end; }
.b #child { width: 100px; height: 100px; }
#grandChild { width: 100px; height: 100px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------