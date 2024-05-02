# A Clone of the Self Authoring Program

## Deployed at [SelfAuthoringClone.com](https://self-authoring-clone.vercel.app)

### Todo

-   [] Mobile size causes text input icons not to be vertically aligned sometimes?
-   [] bg behind input icons, especially needed for mobile where w-full is not crazy long
-   [] Copy does not always match how the app actually works anymore
-   [] "Return to last finished page"?
-   [] Empty experiences still load pages during Significant Experiences. (Might as well fix this during an overhaul of UI facing CRUD, because initially seeding with 8 was arbitrary and due to constraints of the old platform, we can do cooler here)
-   [] Make all the payment buttons link to actual SelfAuthoring.com
-   [] Make disclaimer banner that this is a demonstration app
-   [x] Change copyright statements "reserved to <Link>"
-   [] Change password link is totally fake
-   [x] No link back to '/'??
-   [] "Prevent access to future pages you haven't reached yet"? (Why?)
-   [] Emptying the description box for an experience should not show that toast
-   [x] Fix email case sensitivity

### Notes:

-   [ ] Sign UP flow has no entry point
-   [ ] Sign up flow currently runs zero checks for valid input, I don't recall it checking for extant emails
-   [ ] Need a subsection title inside authoring suites to show that you are in "extended analysis" etc
-   [ ] Disable the previous next buttons for during any loading state (pass a setInProgress down into the wizards )
-   [ ] Most of the wholesale loading page blockers can be moved into the 1st level, so that the frame of the page shows while the data loads.
-   [ ] When finished typing on title inputs, a green check shows that the value has been saved. This should persist until next update-query fire, but goes away on refocus of the input (is this a bug or feature?)
-   [ ] Failure safety on the select for analysis page isn't great. I would like to see a back end error result in a visual reset to the previous state, so the user sees a UI that remains in sync with the DB state, even on error
-   [ ] Print out functionality is pretty broken without some intentional effort
-   [ ] The experiences for an epoch page initializes with like 8 experiences. What should happen if they neglect to delete and neglect to fill out some of the bottom ones? What about if they are insane and skip one for no reason?
-   [ ] The model cycling next-previous sections, like going through each impact of experienced, could be better optimized. It re-pings for adjacent data each slide of the window down the list, but could be wrapped in a layout which gets all the models and slides the selected link pair down the line, so the query fires onces for the whole section (and can fire on the intro page so that the loading state is likely always hidden).
-   [ ] Yes fine cool, drag and drop reorder works with useState mask so it looks instant while the DB does work, great great... What happens if the DB update fails for some reason?
-   [ ] Programmatic calculations can make sure that the progress bar legitimately represents how far along someone is. REquires calculating the orders amongst the totals, but for now I don't care to add the extra DB calls for a feature that can be reasonably faked, as I am worried about making sure the performance stays peak.
-   [ ] The semantic UI clarity of the "select 10 critical experiences" page, where it displays the selected count, doesn't discriminate between number selected out of TOTAL experiences vs selected out of the ABOVE MENTIONED 10 (currently displays out of total, despite mentioning 10 above)
-   [ ] Whatever in the holy world is causing the placeholder: bg color to be tinted yellow despite being set to blue (certain browsers, seems related to an extension/browser specific)
-   [ ] Zero reason for some of this to be a multi page process. Can make components and page-partials and radically reduce the number of DB calls.
