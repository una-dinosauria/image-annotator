
// I am trying to port the tracker described in
//
// J. F. Henriques, R. Caseiro, P. Martins, J. Batista
// ECCV - European Conference on Computer Vision, 2012
//
// to javascript. This should be fun!

// --
// Julieta. January 2015.
/

// Parameter according to the paper
var padding = 1;
var output_sigma_factor = 1/16;
var sigma = 0.2;
var lambda = .01;
var interp_factor = 0.0075;

// Following the original matlab code, variables ending in _f are in the frequency domain.

// TODO load the video.
var img_files = 0;
var pos = 0;
var target_sz = 0; // [1, by 2 array].
var resize_image = 0;
var ground_truth = 0;
var video_path = 0;

var sz = Math.floor( target_sz * (1 + padding) );

// Desired output (gaussian shapped), bandwith proportional to target size.
var output_sigma = Math.sqrt( target_sz[0] * target_sz[1] ) * output_sigma_factor;

// To process an array in a few lines use array.forEach: http://jsfiddle.net/9dc7mofp/


