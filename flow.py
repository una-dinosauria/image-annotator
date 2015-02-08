from PIL import Image
from matplotlib import pyplot as plt
import cv2
import numpy as np

def draw_flow(img, flow, step=16):
	h, w = img.shape[:2]
	y, x = np.mgrid[step/2:h:step, step/2:w:step].reshape(2,-1)
	fx, fy = flow[y,x].T
	lines = np.vstack([x, y, x+fx, y+fy]).T.reshape(-1, 2, 2)
	lines = np.int32(lines + 0.5)
	vis = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
	cv2.polylines(vis, lines, 0, (0, 255, 0))
	for (x1, y1), (x2, y2) in lines:
		cv2.circle(vis, (x1, y1), 1, (0, 255, 0), -1)
	return vis

def draw_hsv(flow):
	h, w = flow.shape[:2]
	fx, fy = flow[:,:,0], flow[:,:,1]
	ang = np.arctan2(fy, fx) + np.pi
	v = np.sqrt(fx*fx+fy*fy)
	hsv = np.zeros((h, w, 3), np.uint8)
	hsv[...,0] = ang*(180/np.pi/2)
	hsv[...,1] = 255
	hsv[...,2] = np.minimum(v*4, 255)
	rgb = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
	return rgb

# Second argument 0 means load in grayscale.
bpath = 'imgs/obliquecam/cam1logfile4/'

for i in range(99):

	im  = cv2.imread(bpath + 'cam1logfile4_{0:05d}.jpeg'.format(i+1),   0);
	im2 = cv2.imread(bpath + 'cam1logfile4_{0:05d}.jpeg'.format(i+2), 0);

	flow = cv2.calcOpticalFlowFarneback(im, im2, None, 0.5, 3, 15, 3, 5, 1.2, 0)
	# rgb  = draw_hsv(flow)
	rgb  = draw_flow( im2, flow );

	plt.imshow( rgb )
	plt.pause(.1);
	plt.draw()


