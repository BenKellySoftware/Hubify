# Hubify

A social network demo running on NodeJS through Heroku,
built for my year 12 software development and design major work.

This program allows you to create an account, like and unlike a set of intrests, and post to those intrest's hubs.

# Release Notes

##1.0.0: Beta release
 - Major work complete.

##0.11.0: Final Polish
 - Styling of the create user and login page
 - Styling of the profile page
 - Added header images to hubs
 - Moved logout bar from profile tab to top bar

##0.10.0: Sort liked hubs
 - Added new list item in hubs dropdown menu named 'Sort Alphabetically'
 - When clicked, resorts the menu in alphabetical order and removes itself
 - Reapears if changes are made to liked hubs

##0.9.0: Like/unlike hubs
 - Toggles button name and state on press
 - Sends like, user and state to server to change information 
 - Reloads user data with changed information

##0.8.0: User creation
 - Date of birth selector has right year and day range based on year required to be old enough, and days in a month (leap years included)
 - Data validation that all required formes are filled out, age must be above 13, Email must be valid (has a @ symbol), and email must not already been taken.
 - Uses binary search to find position of user (insertion sort based on Email)
 - Sends new user to server with position to be spliced in.

##0.7.2: Style post bar and form
 - Center input in post bar
 - Animation to show and hide post form, including converting rounded corners to square and back.
 - Style labels, inputs and buttons in form
 - Styling image submit input

##0.7.1: Image uploads
 - Check if image post, then get image from file input
 - Data validation if image is inputed
 - Created image upload subroutine that converts image to binary and sends to server.

##0.7.0: Post to hub
 - Data validation for posts, title must be filled out, check what kind of post (Text or Image)
 - Push new post to hub data both locally and through socket.io emit
 - Reload hubs

##0.6.1: JSON data storage
 - Moved DATA variable from a javascript file to a JSON file
 - Using JSONlint, converted and verifyed data
 - Using ajax, load data into the client

##0.6.0: Server side linking
 - Moved frontend code into heroku nodejs template
 - Served client side program up to local host via express
 - Using socket.io, linked the client to the server

##0.5.1: Style bar
 - Added search image to left of input
 - Resized tabs to fit search bar
 - Made search bar variable width based on page size.

##0.5.0: Search bar
 - Added input to top bar
 - Created function on key input that gets input value and creates a list of all hubs that contain that string
 - Display list as a dropdown menu

##0.4.0: Load posts
 - Created a div with the title, author, and either text or image/caption based on if its a text or image post
 - Made Posts stack in 2 columns with fixed width, but with variable height

##0.3.1: Stylise top bar
 - Resized list item, stack them left to right instead of up and down
 - Made adjustable by screen size

##0.3.0: Tab switiching
 - Created list of Home, Profile, Matches, and Hubs
 - Dropdown menu for liked hubs created on profile load
 - Implemented tab switching procedure

##0.2.1: Profile picture
 - Styled profile picture into circle with a shadow

##0.2.0: Profile page
 - Created empty divs to be filled on page enter
 - Loads user data into global variable on page load
 - Fills out page with information
 - Created get age function that converts date of birth to age

##0.1.2: Redirect
 - Set up index page to be redirected to after login, creates cookie to check on page enter

##0.1.1: Login process
 - Implemented Login and logout procedure

##0.1.0: Find user
 - Finds user based on email with binary search

##0.0.2: Template login
 - Create basic login screen with email and password inputs
 - Linked html with code and jQuery

##0.0.1: Prototyping data
 - Wrote up demo user and like data
