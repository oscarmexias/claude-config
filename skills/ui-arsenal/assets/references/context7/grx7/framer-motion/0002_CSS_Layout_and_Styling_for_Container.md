# CSS Layout and Styling for Container

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-object-greensock.html

Defines responsive flexbox container with padding and individual box dimensions. Sets up the visual layout for the benchmark demonstration with zero margin/padding reset on body element.

```css
body {
  padding: 0;
  margin: 0;
}

.container {
  padding: 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.container > div {
  width: 100px;
  height: 100px;
}

.box {
  width: 10px;
  height: 100px;
  background-color: #fff;
}
```

--------------------------------