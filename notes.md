# Here we write general notes about the annotator

After talk with Ankur, we decided following features:
+ ~~Puppet has to be color-coded so that one can differentiate between automatically generated key-point and human~~
+ ~~Interpolation~~ --- ~~Linear~~ and ~~flow based~~.
~~[Flow based interpolation for multiple frames will be done by interpolating between neighboring frames at a time and
progressing]~~
+ ~~Keyboard based navigation~~ & ~~downloading annotations~~
+ ~~Tagged key-point. Also there has to be a button so that user can say that the puppet is OK or well-tagged and can be
used for interpolation (We decided to have a button or marker for this roughly at the center of mass of puppet)~~
+ ~~A help guide to be shown at the side or some other way to guide the user.~~

#TODO
+ Restructuring the code
+ buttons and text to be organized and made presentable.
+ Sample annotations

# After call on 26/4
## Remaining (Important, Nice to have, Quick Fixes)
+ ~~Loading images on demand.~~
	+ fix flow image issue -- CORS problem
	Note: This problem comes when locally loading the pages. 
+ Deletion of annotations. Handling it gracefully for neighboring frames.
+ There would be two cases here. If you delete a user touched pointed or automatically generated point.
+ When you modify the annotation on nth frame the interpolations should get updated for all the automatically tagged
points until the next manually tagged point is hit.
+ User does not get any feedback after pressing the copy annotation button. One way to do that can be to forward the
frames. (start showing the logs to user)
----------------------------
+ Server side code for persistence.
+ Setting up a mechanical-turk job.

## Minor:
+ ~~Generate random puppet at the center (it seems a bit out of frame).~~
+ Generate random puppet only if there is no user generated puppet available in the frame.
+ Change the button labels to something like “copy annotation to the next frame”.
	Deactivate copy buttons if there are no annotations in the current frame.
+ In CSV file ‘data ,’ should be ‘data, ’ (comma is after the space).
+ Give the central marker a different shape/color.
+ The number of frames textbox: put default value or make it non-editable.
+ Remove the show image checkbox.
+ HTML related :	
	+ Beautify (e.g., Use images instead of text for buttons etc.)
	+ Put keyboard shortcuts in a popup, that shows only when user requests it.

## Bugs
+ The image does not load by itself for the first frame.
