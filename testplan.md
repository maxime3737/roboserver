run all tests on a robot built to the minimum requirements:
* gold case
* t2 cpu
* t1 memory x2
* EEPROM (Lua BIOS)
* t1 hard disk drive with OpenOS installed
* internet card
* geolyzer
* inventory controller
* crafting upgrade
* inventory upgrade

lua installation on robot
* paste install.txt into a robot's terminal
* make sure to test it with and without the server running locally
* easy config should ask you for information
* make sure it successfully connects to the specified server

login
* confirm that account registration fails when it doesn't have a username and a password
* confirm that account registration succeeds with a username and password
* confirm that login fails for nonexistent accounts
* confirm that login fails for incorrect password on existing accounts
* confirm that login succeeds for correct password on existing account

robot connections on page load
* test page load with no listening robots
  * command input box will be hidden, power will be empty, robot select will be empty
* test page load with a listening robot
  * confirm that robot sends its location and is rendered 
  * confirm that robot sends a scan which is rendered
  * confirm that the robot select shows the robot's name
  * confirm that when the robot's components config contains raw set to true, the command input becomes visible
  * confirm that otherwise, the command input remains invisible
* test page load with two listening robots
  * make sure everything goes just like the check with one robot

test first robot connecting after web client is loaded
* confirm that robot sends its location and is rendered 
* confirm that robot sends a scan which is rendered
* confirm that the robot select shows the robot's name
* confirm that when the robot has raw set to true, the command input becomes visible
* confirm that when raw is false, the command input remains invisible

top left panel
* confirm logged in account name is displayed
* after a robot is connected, confirm that its power level is displayed correctly
* confirm that the displayed cursor position updates as it moves

hotkeys
* confirm that the cursor is lowered into the block you're looking at while alt is held

robot select
* confirm that when no other robots are listening, if a robot starts to listen it is selected
* confirm that if two robots are listening, both appear in the select
* confirm that these things change when a different robot is selected:
  * power level
  * selected robot mesh position
  * robot select name
  * whether the command input is visible
* confirm that switching to a different robot changes the inventories in the UI to those of the new robot
* confirm that switching back to the original robot changes the UI's inventories back again

tool buttons
* confirm that the move button is pressed upon page load
* confirm that when the swing or place buttons are pressed, the coordinate forms expand
* confirm that when the move, interact, or inspect buttons are pressed, the coordinate forms collapse

move
* confirm that the robot can move up, down, forward, and can rotate
* confirm that attempting to move to an occupied space fails
* confirm that the robot selected mesh follows the robot
* confirmed that opened external inventories are removed upon move

interact
* have a robot equip a block and interact with an empty space adjacent to another block
* confirm that the robot now has 1 less of the equipped block
* confirm that interacting with an inventory causes it and the robot's inventory to display

inspect
* inspect an area that appears empty but actually has a block
  * confirm that the block appears
* inspect an area that appears to have a block but does not
  * confirm that the block disappears
* inspect an area of uniform blocks
  * confirm that they're all rendered as the same hardness afterwards

swing
* make sure you've got an appropriate tool equipped
* confirm that the robot has more blocks in its inventory after digging an area (min. volume 2)
* confirm that the robot still attempts to dig every point in a selection when some are empty

place
* select a block
* select an area including empty and occupied spaces
* confirm that blocks are now shown as placed in the empty spaces
* confirm that the inventory updates automatically to show fewer of the selected block present

coordinate forms
* confirm that clicking once with either the swing or place tools selected fills in the first form
* confirm that with the first form already filled in, clicking with these tools selected fills in the second form
* confirm that after a click with both forms already filled, they are both cleared.
* confirm that the coordinate forms are cleared when the selected tool changes
* what's the current behaviour for partially filled forms?

craft
* confirm that crafting fails when you don't have the required raw materials
* confirm that recipes with multiple materials and one product work (a bowl from spruce wood logs)
* confirm that recipes with multiple materials and multiple products work (spruce boat from logs)
* confirm that recipes which require a material to be crafted multiple times work (chest from logs)
* confirm that recipes where one material is used to craft another work (wooden pickaxe from logs)
* confirm that the inventory updates during the crafting process
* confirm that crafting succeeds when you do have the required raw materials

inventory button
* while a robot is selected
  * confirm that no inventory is displayed before clicking the inventory button
  * confirm that pressing it reveals the robot's inventory
  * confirm that pressing it again hides the inventory
  * confirm that pressing it a third time reveals an updated inventory

scan
* confirm that a scan is performed when pressed
* confirm that the robot remains pink and is not overwritten to be gray

equip
* confirm that the inventory is opened when pressed
* confirm that any item in the selected slot is equipped, and any equipped item is moved to the selected slot.

center
* confirm that the camera is positioned above the selected robot, looking down

cutaway
* confirm that moving the cutaway value up or down modifies the display accordingly
* confirm that changing the cutaway axis modifies the display accordingly
* confirm that changing the cutaway operator modifies the display accordingly

scan size
* confirm that moving and button scans are not performed if set to none
* confirm that moving and button scans of the appropriate size are performed when set to small
* confirm that moving and button scans of the appropriate size are performed when set to large

command history display
* confirm that the command history panel is not displayed when empty
* confirm that robot responses show up after sending a command
* confirm that clicking a sent command sends it again with the same parameters

command input
* confirm that attempts to serialize functions do not trigger a tcp reconnect
* confirm that code execution results are reported when the code contains an error
* confirm that code execution results are reported when the code does not contain an error

inventory logic
* move empty slot onto stack (what's the expected behavior?)
* move stack onto empty slot
* move stack onto different stack (should swap)
* move stack onto similar stack (combined stack size <= max stack size)
* move stack onto similar stack (source partial, target full)
* move stack onto similar stack (source full, target partial)

* split stack into empty slot
* split stack into different stack
* split stack into similar stack (amount <= space in target)
* split stack into similar stack (amount > space in target)

* move internal stack to external empty slot
* move external stack to internal empty slot
* fail to move external stack to external empty slot

config
* change position, orientation, booleans to string equivalents
* change ip address to hostname
* ensure things still work

install
* make sure the server install works
* make sure the binaries work