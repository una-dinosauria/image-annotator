// This is where our main code will be.
    // make the raphael canvas available outside its local function
            var r;
            var img_path  = 'imgs/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';
            var flow_path = 'flow/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';

            window.onload = function () {
                // todo: in general we have to use image size here
                r = raphael("holder", 640, 480),

                // handles are black, they have no line around them.
                discattr = {fill: "#fff", stroke: "none"};

                // draw the current image on the back of the canvas.
                r.image( sprintf(img_path, 1), 0,0,640,480);

                // draw a rectangle around the imag and put some instructions.
                //r.rect(0, 0, 640, 480, 0).attr({stroke: "#666"});
                r.text(310, 20, "drag the points to change the curves").attr({fill: "#fff", "font-size": 16});

                function curve(hx, hy, lax, lay, llx, lly, rlx, rly, rax, ray, color) {
                    // draw the lines in svg format.
                    var path = [["m", hx, hy], ["l", lax, lay], ["l", llx, lly], ["l", rlx, rly], ["l", rax, ray], ["l", hx, hy]],
                    curve = r.path(path).attr({stroke: color || raphael.getcolor(), "stroke-width": 4, "stroke-linecap": "round"}),
                    // draw the control points.
                    controls = r.set(
                        r.circle(hx, hy, 5).attr(discattr),
                        r.circle(lax, lay, 5).attr(discattr),
                        r.circle(llx, lly, 5).attr(discattr),
                        r.circle(rlx, rly, 5).attr(discattr),
                        r.circle(rax, ray, 5).attr(discattr)
                    );
                    // set control listeners for all the points.
                    controls[0].update = function (x, y) {
                        var x = this.attr("cx") + x, y = this.attr("cy") + y;
                        this.attr({cx: x, cy: y});
                        path[0][1] = x; path[0][2] = y;
                         path[5][1] = x; path[5][2] = y;
                        curve.attr({path: path});
                        console.log('x:' + x + " y: " + y);
                    };
                    controls[1].update = function (x, y) {
                        var x = this.attr("cx") + x, y = this.attr("cy") + y;
                        this.attr({cx: x, cy: y});
                        path[1][1] = x; path[1][2] = y;
                        curve.attr({path: path});
                        console.log('x:' + x + " y: " + y);
                    };
                    controls[2].update = function (x, y) {
                        var x = this.attr("cx") + x, y = this.attr("cy") + y;
                        this.attr({cx: x, cy: y});
                        path[2][1] = x; path[2][2] = y;
                        curve.attr({path: path});
                        console.log('x:' + x + " y: " + y);
                    };
                    controls[3].update = function (x, y) {
                        var x = this.attr("cx") + x, y = this.attr("cy") + y;
                        this.attr({cx: x, cy: y});
                        path[3][1] = x; path[3][2] = y;
                        curve.attr({path: path});
                        console.log('x:' + x + " y: " + y);
                    };
                    controls[4].update = function (x, y) {
                        var x = this.attr("cx") + x, y = this.attr("cy") + y;
                        this.attr({cx: x, cy: y});
                        path[4][1] = x; path[4][2] = y;
                        curve.attr({path: path});
                        console.log('x:' + x + " y: " + y);
                    };
                    controls.drag(move, up);
                } // end curve

                //function polyrat( headx, heady, larmx, larmy, rarmx, rarmy, llegx, llegy, rlegx, rlegy, bodyx, bodyy, tailx, taily ) {i

                //}
                           function move(dx, dy) {
                    this.update(dx - (this.dx || 0), dy - (this.dy || 0));
                    this.dx = dx;
                    this.dy = dy;
                }
                function up() {
                    this.dx = this.dy = 0;
                }
                var headx = 329, heady = 341;
                var larmx = 317, larmy = 409;
                var llegx = 231, llegy = 430;
                var rlegx = 265, rlegy = 440;
                var rarmx = 310, rarmy = 420;
                curve( headx, heady, larmx, larmy, llegx, llegy, rlegx, rlegy, rarmx, rarmy, "hsb(0, .75, .75)");
            };





var nimages = 100;
            var play                // this is set to stop the playing when paused or stopped
            var current_image = 1;  // the image we are looking at.drag
            $('#pause_bttn').hide() // since we are not playing initially

            // preload images
            var annotate_images={};
            for (i=0;i<nimages;i++) {
                annotate_images[i] = new image();
                var fname = sprintf( img_path, [i+1] ); // name of the image file.
                annotate_images[i].src = fname
            }

            // this should give you access to the precomputed flow.
            var img = new image()
            var c = document.createelement("canvas")
            img.src = sprintf( flow_path, 1);
            img.onload = function() {
                c.width = img.width;
                c.height = img.height;
                var w = img.width, h = img.height;
                var ctx = c.getcontext("2d");
                ctx.drawimage(img, 0, 0);
                var idata = ctx.getimagedata(0, 0, img.width, img.height);
                var p     = idata.data;
                var lidx;
                var r, g, b, alpha;
                // loop through image pixels
                for (var y=0; y<img.height; y++) {
                    for (var x=0; x<img.width; x++) {

                        l = ( y*w + x ) * 4; // convert to linear index
                        r = p[l];   // red should always be zero
                        g = p[l+1]; // green minus 128 is flow in x
                        b = p[l+2]  //  blue minus 128 is flow in y
                        alpha = p[l+3]; // alpha will always be 255
                    }
                }
}

            // updates the frame details
            function update_image() {
                var fname = sprintf( img_path, [current_image]); // name of the image file.
                r.image(fname,0,0,640,480);
                $('#to_annotate').attr('src', fname); // actually load the image.
                var new_text = sprintf('you are currently on frame %d / %d', current_image, nimages);
                $('#info-text').text( new_text ); // update the text at the top
            }

            // set frame no to frame_no
            function set_frame( frame_no ) {
                current_image  = frame_no;
                update_image();
            }

 // moves ahead by no_of_frame --- can take negative no. and go back
            function advance_frame(no_of_frame){
                var temp_current_image = current_image + no_of_frame;
                if (temp_current_image > nimages){
                    current_image = nimages;
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
                play = window.setinterval(function() {
                    advance_frame(1);
                    if (current_image == nimages){
                        window.clearinterval(play);
                    }
                },100);
            });

            $('#pause_bttn').click(function () {
            $('#play_bttn').toggle();
            $('#pause_bttn').toggle();
            window.clearinterval(play);
            });

  $('#stop_bttn').click(function () {
            window.clearinterval(play);
            $('#play_bttn').show();
            $('#pause_bttn').hide();
            set_frame(1);
            });

            $('#back_bttn').click( function() {
            advance_frame(-1);
            });












/*var NIMAGES         = 111;
var play;                    // this is set to stop the playing when paused or stopped
var current_image   = 1;    // the image we are looking at.
var annotate_images = {};   // this variable has all the preloaded images
var FPS             = 10;  // playing speed

//updates the frame details.
function update_image(){
    var canvas  = document.getElementById('to_annotate');
    var context = canvas.getContext('2d');
    context.drawImage(annotate_images[current_image-1],0,0);
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

$('#pause_bttn').hide()     // since we are not playing initially

//preload images
for (i=0;i<NIMAGES;i++){
    annotate_images[i] = new Image();
    var fname = sprintf('imgs/cam1logfile1_%05d.jpeg', [i+1]); // Name of the image file.
    annotate_images[i].src = fname
}

$('#to_annotate').attr({width:annotate_images[0].naturalWidth,height:annotate_images[0].naturalHeight})
set_frame(1)

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
    },1000/FPS);
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
*/
