import funSizeUrl from "/keyboard-pics/fun-size.jpg";
import ospretteUrl from "/keyboard-pics/osprette.jpg";
import sephiretteUrl from "/keyboard-pics/sephirette.jpg";
import ospretteMxUrl from "/keyboard-pics/osprette-mx.jpg";
import clogUrl from "/keyboard-pics/clog.jpg";
import clogV2Url from "/keyboard-pics/clog-v2.jpg";
import clogV3Url from "/keyboard-pics/clog-v3.jpg";

import { Keyboard } from "./models";

export const REVIEWS_DIR = "/home/smores/pCloudDrive/reviews";
export const RECIPES_DIR = "/home/smores/pCloudDrive/recipes";
export const PAGE_SIZE = 20;

export const ALL_KEYBOARDS: Keyboard[] = [
  {
    name: "The Osprette",
    link: "https://github.com/smores56/osprette",
    imageUrl: ospretteUrl,
    description: ""
  },
  {
    name: "The Fun Size",
    link: "https://github.com/smores56/fun-size",
    imageUrl: funSizeUrl,
    description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum. lorem ipsum lorem ipsum lorem ipsum lorem ipsum. lorem ipsum lorem ipsum lorem ipsum lorem ipsum. "
  },
  {
    name: "The Clog",
    link: "https://github.com/smores56/clog",
    imageUrl: clogUrl,
    description: ""
  },
  {
    name: "The Osprette MX",
    link: "https://github.com/smores56/osprette-mx",
    imageUrl: ospretteMxUrl,
    description: ""
  },
  {
    name: "The Sephirette",
    link: "https://github.com/smores56/sephirette",
    imageUrl: sephiretteUrl,
    description: ""
  },
  {
    name: "The Clog V2",
    link: "https://github.com/smores56/clog-v2",
    imageUrl: clogV2Url,
    description: ""
  },
  // {
  //   name: "The Osprette V2",
  //   link: "https://github.com/smores56/osprette-v2",
  //   imageUrl: ospretteV2Url,
  //   description: ""
  // },
  {
    name: "The Clog V3",
    link: "https://github.com/smores56/clog-v3",
    imageUrl: clogV3Url,
    description: ""
  }
]