/*! Pts.js + fxhash demo. Licensed under Apache License 2.0. Copyright © 2021 William Ngan (williamngan.com) */

import {featureSet, feature} from "../util";
import {Bound, CanvasSpace, Line, Const, Util, Rectangle, Num} from "pts";

// This set up the fxhash features using a convenient utility function `featureSet(...)`. See util.js.
window.$fxhashFeatures = {
  "Background": featureSet( [ [0.1, "Pink"], [0.45, "Blue"], [1, "Yellow"] ] ),
  "Foreground": featureSet( [ [0.1, "Red"], [0.45, "Blue"], [1, "Green"] ] ),
  "Rotation": featureSet( [ [0.3, "Subtle"], [0.7, "Normal"], [1, "Wild"] ] ),
  "Rectangles": featureSet( [ [0.3, "Normal"], [0.7, "A Lot"], [1, "Too Many"] ] ),
}

// Here we map the fxhash features back to values for use in our code
const foreground = {
  'Red': '#f03',
  'Blue': '#06f',
  'Green': '#0c6',
}[ feature('Foreground') ];
const background = {
  'Pink': '#f0f',
  'Blue': '#30f',
  'Yellow': '#fe3',
}[ feature('Background') ];

const rotation = {
  'Subtle': 1,
  'Normal': 2,
  'Wild': 10,
}[ feature('Rotation') ];

const count = {
  'Normal': 30,
  'A Lot': 50,
  'Too Many': 70,
}[ feature('Rectangles') ];



/// The following are Pts.js code. Learn more at https://ptsjs.org

// Initiate Space and Form
const space = new CanvasSpace("#canvas").setup({bgcolor: background, resize: true, retina: true});
const form = space.getForm();
let currBound = new Bound();
let angle = 0;

space.add( {

  // Option init handler
  start: (bound) => {},

  // Animate loop
  animate: (time, ftime) => {

    // five lines of code to animate the rectangles :)
    angle += (Const.one_degree * rotation * 0.1);
    let subs = space.innerBound.map( (p) => Line.subpoints( [p, space.pointer], count ) );
    let rects = Util.zip( subs ).map( (r,i) => {
      return Rectangle.corners( r ).rotate2D( i*Const.one_degree*rotation + angle, space.pointer ) 
    });
    form.stroke("#fff", 1).fill(foreground).polygons( rects );

    // draw some text
    const fontsize = Math.min(40, currBound.height*0.1/space.pixelScale);
    form.font(fontsize, 'bold');
    form.fillOnly('#fff').text( [fontsize, fontsize*1.5], `Background: ${feature('Background')}` );
    form.fillOnly('#fff').text( [fontsize, fontsize*2.5],  `Foreground: ${feature('Foreground')}`);
    form.fillOnly('#fff').text( [fontsize, fontsize*3.5], `Rectangles: ${feature('Rectangles')}` );
    form.fillOnly('#fff').text( [fontsize, fontsize*4.5], `Rotation: ${feature('Rotation')}` );
  },

  // Optional interaction handler
  action: (type, x, y) => {},

  // Optional resize handler
  resize: (bound, evt) => { 
    // When the window resizes, the canvas will resize automatically via css. 
    // We track and update the bound of the space here so that we can update the font size in animate().
    currBound = bound; 
  }
})

export default space;
