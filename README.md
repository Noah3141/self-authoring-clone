# A Clone of the Self Authoring Program

### Todo:

1. Need a subsection title inside authoring suites to show that you are in "extended analysis" etc

2. Disable the previous next buttons for during any loading state (pass a setInProgress down into the wizards )

3. Most of the wholesale loading page blockerrs can be moved into the 1st level, so that the frame of the page shows while the data loads.

4. When finished typing on title inputs, a green check shows that the value has been saved. This should persist, but goes away on refocus of the input. (is this a bug?)
5. Failure safety on the select for analysis page isn't great. I would like to see a back end error result in a visual reset to the previous state, so the user sees a UI that remains in sync with the DB state, even on error

6. The experiences for an epoch page initializes with like 8 experiences. What should happen if they neglect to delete and neglect to fill out some of the bottom ones? What about if they are insane and skip one for no reason?

7. The model cycling next-previous sections, like going through each impact of experienced, could be better optimized. It repings for adjacent data each slide of the window down the list, but could be wrapped in a layout which gets all the models and slides the selected link pair down the line, so the query fires onces for the whole section (and can fire on the intro page so that the loading state is likely always hidden).

8. Programmatic calculations can make sure that the progress bar legitimately represents how far along someone is. REquires calculating the orders amongst the totals, but for now I don't care to add the extra DB calls for a feature that can be reasonably faked, as I am worried about making sure the performance stays peak.

9. The semantic UI clarity of the "select 10 critical experiences" page, where it displays the selected count, doesn't discriminate between number selected out of TOTAL experiences vs selected out of the ABOVE MENTIONED 10 (currently displays out of total, despite mentioning 10 above)
