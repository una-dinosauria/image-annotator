
// This is where our main code will be.

var NIMAGES = 111;

var current_image = 1; // the image we are looking at.

$('#fwd_bttn').click(function () {
	if (current_image === NIMAGES) { return; }

	current_image = current_image + 1; // Update image variable.
	var fname = sprintf('imgs/cam1logfile1_%05d.jpeg', [current_image]); // Name of the image file.
	$('#to_annotate').attr('src', fname); // Actually load the image.
	var new_text = sprintf('You are currently on frame %d / %d', current_image, NIMAGES);
	$('#info-text').text( new_text ); // Update the text at the top
});


$('#back_bttn').click( function() {
	if (current_image === 1) {return;}

	current_image = current_image - 1;
	var fname = sprintf('imgs/cam1logfile1_%05d.jpeg', [current_image]); // Name of the image file.
	$('#to_annotate').attr('src', fname); // Actually load the image.
	var new_text = sprintf('You are currently on frame %d / %d', current_image, NIMAGES);
	$('#info-text').text( new_text ); // Update the text at the top
});
