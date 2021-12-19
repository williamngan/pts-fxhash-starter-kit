/*! Utility functions for fxhash. Licensed under Apache License 2.0. Copyright © 2021 William Ngan (williamngan.com) */

/**
 * Given an array of features with its maximum range, return the current feature name based on fxrand.
 * For example, a fxrand value of 0.11 and an array of [[0.1, "A"], [0.3, "B"]] will return "B"
 * @param {*} features an array of features such as [[0.1, "A"], [0.3, "B"], [1, "C"]]
 * @returns the chosen feature name, eg, "B"
 */
export function featureSet( features ) {
  const rand = window.fxrand();
  for (let i=0; i<features.length; i++) {
    if (rand < features[i][0]) return features[i][1];
  }
  return features[features.length-1][1];
}

/**
 * Given a key, get the current feature value in window.$fxhashFeatures[key]
 */
export function feature( key ) {
  return window.$fxhashFeatures[key];
}