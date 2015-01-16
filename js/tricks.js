
// This is where our main code will be.

// The image that we are looking at.
var current_image = 1;

$('#fwd_bttn').click(function () {

	// Update the current image variable
	current_image = current_image + 1;

	// This is the file that we want to load
	fname = sprintf('imgs/cam1logfile1_%05d.jpeg', [current_image]);

	// Actually load the image.
	$('#to_annotate').attr('src', fname);

	// Update the text at the top
	$('#info-text').text(fname);
});

