
The optical flow images here have been computed using the Farneback method
from opencv2. I am storing them as jpeg images -- which can be loaded as matrices of `RGB-alpha` values.

1. The `Red` channel is always 0
2. The `Green` channel minus 128 is the flow in the `x` direction
3. The `Blue` channel minus 128 is the flow in the `y` direction
4. The `alpha` channel is always 255 (fully opaque)

This can be loaded with an invisible canvas using this script (from [stackoverflow](http://stackoverflow.com/a/14910987/1884420))

``` javascript
var c = document.createElement("canvas");
c.width = img.width;
c.height = img.height;
var ctx = c.getContext("2d");
ctx.drawImage(img, 0, 0);
var pixels = ctx.getImageData(0, 0, img.width, img.height).data;
```

Where pixels is a `width * height * 4` array that contains the `RGB-alpha` values of the image.
