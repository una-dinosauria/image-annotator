
// This is where our main code will be.

var NIMAGES = 100;
var play                // this is set to stop the playing when paused or stopped
var current_image = 1;  // the image we are looking at.
$('#pause_bttn').hide() // since we are not playing initially

var img_path = 'imgs/undercam/cam1logfile1_%05.jpeg';

//preload images
var annotate_images={};
for (i=0;i<NIMAGES;i++){
    annotate_images[i] = new Image();
    var fname = sprintf( img_path, [i+1] ); // Name of the image file.
    annotate_images[i].src = fname
}

//updates the frame details.
function update_image(){
    var fname = sprintf( img_path, [current_image]); // Name of the image file.
    $('#to_annotate').attr('src', fname); // Actually load the image.
    var new_text = sprintf('You are currently on frame %d / %d', current_image, NIMAGES);
    $('#info-text').text( new_text ); // Update the text at the top
}

//set frame no to frame_no
function set_frame(frame_no){
    current_image  = frame_no;
    update_image();
}

// moves ahead by no_of_frame --- can take negative no. and go back
function advance_frame(no_of_frame){
    var temp_current_image = current_image + no_of_frame;
    if (temp_current_image > NIMAGES){
        current_image = NIMAGES;
    }else if  (temp_current_image < 1){
        current_image = 1;
    }else{
        current_image = temp_current_image;
    }
    update_image();
    return ;
}


$('#fwd_bttn').click(function () {
    advance_frame(1);
});

//currently playing speed is set to 10fps
$('#play_bttn').click(function () {
    $('#play_bttn').toggle();
    $('#pause_bttn').toggle();
    play = window.setInterval(function() {
        advance_frame(1);
        if (current_image == NIMAGES){
            window.clearInterval(play);
        }
    },100);
});

$('#pause_bttn').click(function () {
    $('#play_bttn').toggle();
    $('#pause_bttn').toggle();
    window.clearInterval(play);
});

$('#stop_bttn').click(function () {
    window.clearInterval(play);
    $('#play_bttn').show();
    $('#pause_bttn').hide();
    set_frame(1);
});

$('#back_bttn').click( function() {
    advance_frame(-1);
});
