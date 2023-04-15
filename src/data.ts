import funSizeUrl from "~/images/keyboard-pics/fun-size.jpg";
import ospretteUrl from "~/images/keyboard-pics/osprette.jpg";
import sephiretteUrl from "~/images/keyboard-pics/sephirette.jpg";
import ospretteMxUrl from "~/images/keyboard-pics/osprette-mx.jpg";
import clogUrl from "~/images/keyboard-pics/clog.jpg";
import clogV2Url from "~/images/keyboard-pics/clog-v2.jpg";
import clogV3Url from "~/images/keyboard-pics/clog-v3.jpg";

import { Keyboard } from "./models";

export const EMAIL = "sam@sammohr.dev";
export const REVIEWS_DIR = "/home/smores/pCloudDrive/reviews";
export const RECIPES_DIR = "/home/smores/pCloudDrive/recipes";
export const PAGE_SIZE = 20;
export const CLOG_V2_README_URL = "https://github.com/smores56/clog-v2";

const DEFAULT_DESCRIPTION = Array(3).fill(0).map(() => "lorem ipsum lorem ipsum lorem ipsum lorem ipsum.").join(" ");

export const ALL_KEYBOARDS: Keyboard[] = [
  {
    name: "The Osprette",
    link: "https://github.com/smores56/osprette",
    imageUrl: ospretteUrl,
    description: DEFAULT_DESCRIPTION
    // description: "My first foray into the pinky cluster jungle.
    //  With 2 thumb keys on each side, strong pinky stagger, and a comfortable 50 degree angle between the halves, this has all of the cool features of a state-of-the-art unibody ergo keeb. But the big difference that puts this bird on the fringe are the migrated keys on its fringes: the outer top pinky keys are now on the \"sixth\" column.\n\nBut why, you ask? Why send them to the corner for timeout? I unfortunately find that no matter how low I put the pinky columns, I can never quite access those keys without my whole arm moving (at least) a little, which is not the case for any of the other keys on most 34-key boards. Taking inspiration from Brow's Balbuzard, the movement of these keys to the outsides of the pinky columns keeps every key within a comfortable reach.\n\nThe one (arguable) weakness of this approach is that the bigrams (read: subsequent keys) from Q to W and O to P on QWERTY-based layouts will be more awkward than you're used to, but I think it's worth the trade-off."
  },
  {
    name: "The Clog V3",
    link: "https://github.com/smores56/clog-v3",
    imageUrl: clogV3Url,
    description: DEFAULT_DESCRIPTION
  },
  {
    name: "The Clog V2",
    link: "https://github.com/smores56/clog-v2",
    imageUrl: clogV2Url,
    description: DEFAULT_DESCRIPTION
  },
  // {
  //   name: "The Osprette V2",
  //   link: "https://github.com/smores56/osprette-v2",
  //   imageUrl: ospretteV2Url,
  //   description: DEFAULT_DESCRIPTION
  // },
  {
    name: "The Clog",
    link: "https://github.com/smores56/clog",
    imageUrl: clogUrl,
    description: "For the split fiends! For the dreamers! For the wooden-shoe'd! The Clog is the split version of the Osprette, with the same choc-spacing and overall layout, including the number of keys (34) and the pinky cluster. The one minor difference is the 1.5u thumb key, 'cause it fits and it looks great. You can now sew a half to each pant pocket, or just put bumpons on and have good shoulder posture without stabbing yourself in the process."
  },
  {
    name: "The Osprette MX",
    link: "https://github.com/smores56/osprette-mx",
    imageUrl: ospretteMxUrl,
    description: "Following in the footsteps of the original Osprette, this 34-key board feels just as comfortable to use, while letting you put your favorite MX switches to good use. Especially here with the slightly-larger-than-choc MX spacing does moving the top pinky keys to the side make typing more comfortable. You can check out the description for the original Osprette to read more about the pinky cluster schtick."
  },
  {
    name: "The Sephirette",
    link: "https://github.com/smores56/sephirette",
    imageUrl: sephiretteUrl,
    description: "The Sephirette takes the Osprette MX and clefts it in twain! No really, it's the same spacing and all. But with a twist: this is the first S'mores Boards stacked plate case! With FR4 switch plates and bottom plates, you can maintain a relatively low profile and get the protection and weight of a case. The art from Perce is based on my love of all things Final Fantasy and the one-winged nature of this split bird board."
  },
  {
    name: "The Fun Size",
    link: "https://github.com/smores56/fun-size",
    imageUrl: funSizeUrl,
    description: DEFAULT_DESCRIPTION
  }
]