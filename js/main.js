/* General Notes: 
        Note we take x as horizontal --- This has been the biggest confusion so far 
        for me working with images 
    attributes of annotation so far .. 
        img --- image
        flow
        data
            head        (head)
                x
                y
            body
                x
                y
            larm            //rats with hands !! scary
                x
                y
            rarm
                x
                y
            lleg
                x
                y
            rleg    
                x
                y
            tail
                x
                y
            mtail       (middle of tail)
                x
                y
    */          
        
    // Global Variables
    var img_path   = 'imgs/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';
    var flow_path  = 'flow/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';
    var r;
    var nimages    = 100;       
    var play;                   // this is set to stop the playing when paused or stopped; a compulsion
    var current_image = 1;      // the image we are looking at
    var FPS = 10;               // Playing speed; TODO: Provide UI to change it
    var show_image = true;
    var show_annotation = true;
    var annotation = {};        // This should contain image, flow, as well as annotations (coordinates); 
                                // This is all the data we need to save or should be caring about.
                                // Use of attributes seems the most plausible way
    
            //we define the connections here, so that we can color them differently
    var connections = ["head-body","body-larm","body-rarm","body-tail","tail-lleg","tail-rleg","tail-mtail"];

    var connection_color = {"head-body" : "hsb(.3, .75, .75)",
                            "body-larm" : "hsb(.6, .75, .75)",
                            "body-rarm" : "hsb(.1, .75, .75)",
                            "body-tail" : "hsb(.3, .75, .75)",
                            "tail-lleg" : "hsb(.6, .75, .75)",
                            "tail-rleg" : "hsb(.1, .75, .75)",
                            "tail-mtail": "hsb(.3, .75, .75)"};
    
    var parts = ["head","body","larm","rarm","tail","lleg","rleg","mtail"];
    //showing different color on control points in different states
    var control_color = {"click" : {fill: "#FF8000", stroke: "none", opacity:0.5}, 
                         "interp": {fill: "#FF0000", stroke: "none", opacity:0.5},
                        "default": {fill: "#00FF80", stroke: "none", opacity:0.5}};   
    
    // preload all the images and flow; To avoid lags
    for (i=0; i<nimages; i++) {
        annotation[i]           = [];
        annotation[i].img       = new Image();
        annotation[i].img.src   = sprintf( img_path, [i+1] );  // name of the image file.
        annotation[i].flow      = new Image();
        annotation[i].flow.src  = sprintf( flow_path, [i+1]);  // name of flow file
    }
        
    // create raphael element and show a fixed text
    r = Raphael("holder",annotation[0].img.width,annotation[0].img.height); 

    // Note we have to keep track of every svg element we create so that we can reorder it. 
    txt_element = r.text(310, 20, "drag the points to change the curves").attr({fill: "#fff", "font-size": 16});
    txt_element.toFront();
    
    // This function handles drawing of svg and dragging 

    function draw_puppet(keypoints, color) {
        // define lines

        //function to generate path arrays
        function gen_path_array(str1,str2){
            return ["M", keypoints[str1].x, keypoints[str1].y, "L", keypoints[str2].x, keypoints[str2].y];
        }
        
        // draw connections
        var path = {};
        var curve = {} 
        connections.forEach( function(ele,idx){
            path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
        });
        connections.forEach( function (ele,idx){
            curve[ele] = r.path(path[ele]).attr({stroke: connection_color[ele]||Raphael.getColor(),"stroke-width": 4, "stroke-linecap": "round"});
        });
        
        controls = r.set(
            r.circle(keypoints.head.x, keypoints.head.y, 5),
            r.circle(keypoints.body.x, keypoints.body.y, 5),
            r.circle(keypoints.larm.x, keypoints.larm.y, 5),
            r.circle(keypoints.rarm.x, keypoints.rarm.y, 5),
            r.circle(keypoints.tail.x, keypoints.tail.y, 5),
            r.circle(keypoints.lleg.x, keypoints.lleg.y, 5),
            r.circle(keypoints.rleg.x, keypoints.rleg.y, 5),
            r.circle(keypoints.mtail.x, keypoints.mtail.y, 5)
        );
        
        //since order is same I am saved.
        var i=0;
        for (var prop in keypoints){
            if (keypoints[prop].interp){
                controls[i].attr(control_color["interp"]);
            }else{
                controls[i].attr(control_color["default"]);
            }
            i=i+1;
        }    

        // set control listeners for all the points. There ain't no easy way for this
        controls[0].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.head = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };
        
        controls[1].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.body = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };

        controls[2].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.larm = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };
        
        controls[3].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.rarm = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };

        controls[4].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.tail = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };

        controls[5].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.lleg = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };
        
        controls[6].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.rleg = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };

        controls[7].update = function (x, y) {
            var X = this.attr("cx") + x, Y = this.attr("cy") + y;
            keypoints.mtail = {x: X, y: Y, interp: false};
            this.attr({cx: X, cy: Y});
            this.attr(control_color["default"]);
            connections.forEach( function(ele,idx){
                path[ele] = gen_path_array (ele.split("-")[0],ele.split("-")[1]);
            });
            connections.forEach( function (ele,idx){
                curve[ele].attr({path:path[ele]});
                });
            };
        controls.drag(move, up);
        controls.mousedown(function () {
            this.attr(control_color["click"]); 
        });
        controls.mouseup(function () {
            this.attr(control_color["default"]); 
        });
        controls.mouseover(function(){
            this.attr({r:10});
        });
        controls.mouseout(function(){
            this.attr({r:5});
        });
        
    } // end curve

    function move(dx, dy) {
        this.update(dx - (this.dx || 0), dy - (this.dy || 0));
        this.dx = dx;
        this.dy = dy;
    }
        
    function up() {
        this.dx = this.dy = 0;
    }
    
    // updates the frame details
    function update_image() {
        img = annotation[current_image-1].img;
        r.clear(); 
        if (show_image){
            r.image(img.src,0,0,img.width,img.height);
        }else{
            r.rect(0,0,img.width,img.height,0).attr({stroke:'#666'});   
        }
        if (show_annotation){
            if (annotation[current_image-1].hasOwnProperty("data")){
                var annotate = annotation[current_image-1].data;
                draw_puppet(annotate);
            }
        }
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
    
    function chkbox(){
        var img_chk = document.getElementById("show_image_chkbox");
        if (img_chk.checked){
            show_image = true;
        }else{
            show_image = false;
        }

        var annotation_chk = document.getElementById("show_annotation_chkbox");
        if (annotation_chk.checked){
            show_annotation = true;
        }else{
            show_annotation = false;
        }
        update_image();
    }

    function flow_prediction(data){
        var new_data = [];//annotation[current_image-1].data;
        var img = new Image();
        var c = document.createElement("canvas")
        img.src = annotation[current_image-2].flow.src;  // note that flow for current image is in number 1 less than the image
       // img.onload = function() {
            c.width = img.width;
            c.height = img.height;
            var w = img.width, h = img.height;
            var ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var idata = ctx.getImageData(0, 0, img.width, img.height);
            var p     = idata.data;
            var l;
                        
            l = (data.head.y*w + data.head.x) * 4;
            new_data.head = {x:data.head.x+p[l+1]-128,y:data.head.y+p[l+2]-128};

            l = (data.body.y*w + data.body.x) * 4;
            new_data.body = {x:data.body.x+p[l+1]-128,y:data.body.y+p[l+2]-128};
            
            l = (data.larm.y*w + data.larm.x) * 4;
            new_data.larm = {x:data.larm.x+p[l+1]-128,y:data.larm.y+p[l+2]-128};
        
            l = (data.rarm.y*w + data.rarm.x) * 4;
            new_data.rarm = {x:data.rarm.x+p[l+1]-128,y:data.rarm.y+p[l+2]-128};
            
            l = (data.tail.y*w + data.tail.x) * 4;
            new_data.tail = {x:data.tail.x+p[l+1]-128,y:data.tail.y+p[l+2]-128};

            l = (data.lleg.y*w + data.lleg.x) * 4;
            new_data.lleg = {x:data.lleg.x+p[l+1]-128,y:data.lleg.y+p[l+2]-128};

            l = (data.rleg.y*w + data.rleg.x) * 4;
            new_data.rleg = {x:data.rleg.x+p[l+1]-128,y:data.rleg.y+p[l+2]-128};
                
            l = (data.mtail.y*w + data.mtail.x) * 4;
            new_data.mtail = {x:data.mtail.x+p[l+1]-128,y:data.mtail.y+p[l+2]-128};
            console.log(new_data);
        //}
        return new_data;
    }
    
    $('#fwd_bttn').click(function () {
        advance_frame(1);
    });

    $('#play_bttn').click(function () {
        //TODO: disable annotation buttons when playing
        $('#play_bttn').hide();
        $('#pause_bttn').show();
        play = window.setInterval(function() {
            advance_frame(1);
            if (current_image == nimages){
                window.clearInterval(play);
            }
            },1000/FPS);
        });

    $('#pause_bttn').click(function () {
        $('#play_bttn').show();
        $('#pause_bttn').hide();
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

    $('#gen_random_bttn').click(function() {
        // generate a random puppet
        if (!annotation[current_image-1].hasOwnProperty("data")){
            annotation[current_image-1].data = [];
        }     
        var annotate = annotation[current_image-1].data;
            
        annotate.head = {x:240,y:240,interp:true};
        annotate.body = {x:240,y:280,interp:true};
        annotate.larm = {x:200,y:260,interp:true};
        annotate.rarm = {x:280,y:260,interp:true};
        annotate.lleg = {x:200,y:300,interp:true};
        annotate.rleg = {x:280,y:300,interp:true};
        annotate.tail = {x:240,y:330,interp:true};
        annotate.mtail = {x:240,y:360,interp:true};
        update_image();
        console.log('here');
    });
        
    $('#copy_prev_bttn').click(function() {
        //copy previous annotation
        if (current_image == 1){
            alert ("There is no previous frame");
        }else{
            if (!annotation[current_image-2].hasOwnProperty("data")){
                alert('No annotation on previous image');
            }else{
                annotation[current_image-1].data = [];
                annotation[current_image-1].data = jQuery.extend(true,{},annotation[current_image-2].data);
                var annotate = annotation[current_image-1].data;
                annotate.head.interp = true;
                annotate.body.interp = true;
                annotate.larm.interp = true;
                annotate.rarm.interp = true;
                annotate.lleg.interp = true;
                annotate.rleg.interp = true;
                annotate.tail.interp = true;
                annotate.mtail.interp = true;
                update_image();
                console.log('here');
            }
        }
    });   
    
    $('#use_flow_bttn').click(function() {
        if (current_image == 1){
            alert ("There is no previous frame");
        }else{
            if (!annotation[current_image-2].hasOwnProperty("data")){
                alert('No annotation on previous image');
            }else{
                annotation[current_image-1].data = [];
                annotation[current_image-1].data = flow_prediction(annotation[current_image-2].data);
                var annotate = annotation[current_image-1].data;
                console.log(annotate.head);
                annotate.head.interp = true;
                annotate.body.interp = true;
                annotate.larm.interp = true;
                annotate.rarm.interp = true;
                annotate.lleg.interp = true;
                annotate.rleg.interp = true;
                annotate.tail.interp = true;
                annotate.mtail.interp = true;
                update_image();
                console.log('here');
            }

        }
        
    }); 

    set_frame(1);

        // this should give you access to the precomputed flow.
        /* commenting it out for now as we are not using optical flow now- Umang 
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
        */
