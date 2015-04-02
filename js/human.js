        
/* 
*   Global Variables
*  All the variables the user need to set should be on the top
*/
var img_path        = 'imgs/ixmas_daniel_cam1/img%04d.jpg';
var flow_path       = 'flow/ixmas_daniel_cam1/img%04d.jpg';
var nimages         = 500;              //TODO: This could be determined automatically    
var FPS             = 10;               // Playing speed; TODO: Provide UI to change it

// control_points are the keypoints
// control_attr are the attributes applied to control points in different states. 
// States are mouseover, interp (true), default (interp = false)
var control_points  = ["head","neck","lsh","rsh","larm","rarm","lwr","rwr","ltor","rtor","lknee","rknee","lleg","rleg"];
var control_attr    = {"mouseover"  : {fill: "#FF8000", stroke: "none", opacity:0.5, r:10},
                       "interp"     : {fill: "#FF0000", stroke: "none", opacity:0.5, r:5 },
                       "default"    : {fill: "#00FF80", stroke: "none", opacity:0.5, r:5}};

// Connections is where to draw the line
var connections     =  ["head-neck","neck-lsh","neck-rsh","lsh-larm","rsh-rarm","larm-lwr","rarm-rwr","ltor-lknee","rtor-rknee","lknee-lleg","rknee-rleg"];
var connection_color= {"head-neck" : "hsb(.3, .75, .75)",
                       "neck-lsh"  : "hsb(.3, .75, .75)",
                       "neck-rsh"  : "hsb(.6, .75, .75)",
                       "lsh-larm"  : "hsb(.3, .75, .75)",
                       "rsh-rarm"  : "hsb(.6, .75, .75)",
                       "larm-lwr"  : "hsb(.3, .75, .75)",
                       "rarm-rwr"  : "hsb(.6, .75, .75)",
                       "ltor-lknee": "hsb(.3, .75, .75)",
                       "rtor-rknee": "hsb(.6, .75, .75)",
                       "lknee-lleg": "hsb(.3, .75, .75)",
                       "rknee-rleg": "hsb(.6, .75, .75)" };

var center_point  = "neck-ltor";
    
// assigned when using random generation, take care the order should be same as control_points
var rand_coordinates ={};
    rand_coordinates.head = {x:240,y:200,interp:true};
    rand_coordinates.neck = {x:240,y:240,interp:true};
    rand_coordinates.lsh  = {x:200,y:240,interp:true};
    rand_coordinates.rsh  = {x:280,y:240,interp:true};
    rand_coordinates.larm = {x:200,y:280,interp:true};
    rand_coordinates.rarm = {x:280,y:280,interp:true};
    rand_coordinates.lwr  = {x:200,y:320,interp:true};
    rand_coordinates.rwr  = {x:280,y:320,interp:true};
    rand_coordinates.ltor = {x:220,y:330,interp:true};
    rand_coordinates.rtor = {x:260,y:330,interp:true};
    rand_coordinates.lknee= {x:220,y:360,interp:true};
    rand_coordinates.rknee= {x:260,y:360,interp:true};
    rand_coordinates.lleg = {x:220,y:390,interp:true};
    rand_coordinates.rleg= {x:260,y:390,interp:true};
// Beyond this no change should be required by the user

