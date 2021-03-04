

Notes:

To run program:
    in ArtGalleryLive folder:
    node art.js 
(this will start the website under the current port number. See terminal output for website address)

To change the port number, change it in the following two locations:
    1) near the top of art.js where the variable "port" is declared.
    2) in the public folder, under the portNumber.js file. Change the "number" variable to the port you want

When updating a painting: 
    1) If user updates orderID, this will change all orderID's that were foreign keys in other tables
    2) If user updates galleryID, this will change all gallerID's (associated with that order) that were foreign keys in other tables