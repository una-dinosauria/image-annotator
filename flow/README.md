
The optical flow images here have been computed using the Farneback method
from opencv2. I am storing them as jpeg images, where

a) r and g correspond to the flow in x and y respectively
b) the b channel is unused
c) everything is offset by +128 -- so that things could be stored with uint8s

Hopefully we can implement this flow as a lookup table operation using canvas.
