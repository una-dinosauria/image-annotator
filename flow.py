from PIL import Image
from matplotlib import pyplot as plt
import cv2
import numpy as np
import os

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

if __name__ == '__main__':

#	dirs = ['obliquecam/cam1logfile4/',
#	'obliquecam/cam1logfile5/',
#	'obliquecam/cam2logfile4/',
#	'obliquecam/cam1logfile7/',
#	'obliquecam/cam2logfile5/',
#	'obliquecam/cam1logfile6/',
#	'obliquecam/cam2logfile7/',
#	'obliquecam/cam2logfile6/',
#	'undercam/cam1logfile2/',
#	'undercam/cam2logfile2/',
#	'undercam/cam2logfile1/',
#	'undercam/cam2logfile3/',
#	'undercam/cam1logfile1/',
#	'undercam/cam1logfile3/'];
	dirs = ['ixmas_daniel_cam1/'];
	bpath = 'imgs/'
	dpath = 'flow/'

	for directory in dirs:

		files = sorted(os.listdir( bpath + directory ));
		print '%d files in %s' % ( len(files), directory )

		for i in range( len(files)-1 ):

			# Second argument 0 means load in grayscale.
			im  = cv2.imread( bpath + directory + files[i], 0);
			im2 = cv2.imread( bpath + directory + files[i+1], 0);
			print bpath + directory + files[i+1]
			print 'Computing flow between %s and %s' % (files[i], files[i+1])

			flow = cv2.calcOpticalFlowFarneback(im, im2, 0.5, 3, 15, 3, 5, 1.2, 0)
			flow = flow + 128

			# rgb  = draw_hsv(flow)
			# rgb  = draw_flow( im2, flow );

			print 'Min is %.2f and max is %.2f' % (np.min(flow), np.max(flow))

			w, h = np.shape( im )
			rgb = np.zeros( (w, h, 3) );
			rgb[:,:,0] = flow[:,:,0];
			rgb[:,:,1] = flow[:,:,1];

			rgb = rgb.astype( np.uint8 );

			im  = cv2.imwrite( dpath + directory + files[i], rgb);

			# plt.imshow( rgb )
			# plt.colorbar()
			# plt.pause(.1);
			# plt.draw()


