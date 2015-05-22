var img_path        = 'imgs/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';
var flow_path       = 'flow/undercam/cam1logfile1/cam1logfile1_%05d.jpeg';
var nimages         = 100;              //TODO: This could be determined automatically    
var FPS             = 10;               // Playing speed; TODO: Provide UI to change it

// control_points are the keypoints
// control_attr are the attributes applied to control points in different states. 
// States are mouseover, interp (true), default (interp = false)
var control_points  = ["head","body","larm","rarm","tail","lleg","rleg","mtail","etail"];
var control_attr    = {"mouseover"  : {fill: "#FF8000", stroke: "none", opacity:0.5, r:10},
                       "interp"     : {fill: "#FF0000", stroke: "none", opacity:0.5, r:5 },
                       "default"    : {fill: "#00FF80", stroke: "none", opacity:0.5, r:5}};
    
// Connections is where to draw the line
var connections     =
["head-body","body-larm","body-rarm","body-tail","tail-lleg","tail-rleg","tail-mtail","mtail-etail"];
var connection_color= {"head-body" : "hsb(.3, .75, .75)",
                       "body-larm" : "hsb(.6, .75, .75)",
                       "body-rarm" : "hsb(.1, .75, .75)",
                       "body-tail" : "hsb(.3, .75, .75)",
                       "tail-lleg" : "hsb(.6, .75, .75)",
                       "tail-rleg" : "hsb(.1, .75, .75)",
                       "tail-mtail": "hsb(.3, .75, .75)",
                       "mtail-etail":"hsb(.3, .75, .75)"};

var center_point  = "body-tail";

// assigned when using random generation, take care the order should be same as control_points
var rand_coordinates ={};
    rand_coordinates.head = {x:240,y:240,interp:true};
    rand_coordinates.body = {x:240,y:280,interp:true};
    rand_coordinates.larm = {x:200,y:260,interp:true};
    rand_coordinates.rarm = {x:280,y:260,interp:true};
    rand_coordinates.tail = {x:240,y:330,interp:true};
    rand_coordinates.lleg = {x:200,y:300,interp:true};
    rand_coordinates.rleg = {x:280,y:300,interp:true};
    rand_coordinates.mtail= {x:240,y:360,interp:true};
    rand_coordinates.etail= {x:240,y:380,interp:true};

