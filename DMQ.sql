-- Project Step 6
-- Art Gallery
-- Patrick Stumbaugh & Zhen Liu

-- Artists Page
--Get all columns from Artists to populate table
SELECT * FROM Artists

--Insert into Artists with artistFirstName and artistLastName
INSERT INTO `Artists`(`artistFirstName`, `artistLastName`) VALUES (:payloadArtistFirstName,:payloadArtistLastName)

--Delete from Artists the user specified artists when delete button is clicked
DELETE FROM `Artists` WHERE Artists.artistID = :payloadIDNumber

--Update Artists using the user specified artists and using user input
UPDATE `Artists` SET `artistFirstName`=:payloadArtistFirstName,`artistLastName`=:payloadArtistLastName WHERE Artists.artistID = :payloadIDNumber



-- Customers Page
--Get all columns from Customers to populate table
SELECT * FROM Customers

--Insert into Customers with customerFirstName and customerLastName
INSERT INTO `Customers`(`customerFirstName`, `customerLastName`) VALUES (:payloadCustomerFirstName,:payloadCustomerLastName)

--Delete from Customers the user specified customer when delete button is clicked
DELETE FROM `Customers` WHERE Customers.customerID = :payloadIDNumber

--Update Customers using the user specified customer and using user input
UPDATE `Customers` SET `customerFirstName`=:payloadCustomerFirstName,`customerLastName`=:payloadCustomerLastName WHERE Customers.customerID = :payloadIDNumber



-- Galleries Page
--Get all columns from Galleries to populate table
SELECT * FROM Galleries

--Insert into Galleries with galleryName
INSERT INTO `Galleries`(`galleryName`) VALUES (:payloadGalleryName)

--Delete from Galleries the user specified gallery when delete button is clicked
DELETE FROM `Galleries` WHERE Galleries.galleryID = :payloadIDNumber

--Update Galleries using the user specified gallery and using user input
UPDATE `Galleries` SET `galleryName`=:payloadGalleryName WHERE Galleries.galleryID = :payloadIDNumber



-- Orders Page
--Get all columns from Orders to populate table
SELECT * FROM Orders

--Insert into Orders with customerID and Update Paintings based on paintings in Order
INSERT INTO `Orders`(`customerID`) VALUES (:payloadCustomerID) --get and save new orderID as :payloadOrderID
SELECT MAX(orderID) FROM Orders --save returned orderID (it's the newest order we just inserted) as payloadOrderID
UPDATE `Paintings` SET `orderID`=:payloadOrderID WHERE Paintings.paintingID =:payloadPaintingID
INSERT INTO `OrdersToGalleries` (orderID, galleryID) VALUES (:payloadOrderID, :payloadGalleryID) --update M:M table to reflect new order
--if there are more than one order, loop:
SELECT MAX(orderID) FROM Orders --save returned orderID (it's the newest order we just inserted in previous steps) as payloadOrderID
UPDATE `Paintings` SET `orderID`=:payloadOrderID WHERE Paintings.paintingID =:payloadPaintingID
INSERT INTO `OrdersToGalleries` (orderID, galleryID) VALUES (:payloadOrderID, :payloadGalleryID)

--Delete from Orders the user specified Order when delete button is clicked
DELETE FROM `Orders` WHERE Orders.orderID = :payloadIDNumber

--Update Orders using the user specified order and using user input
UPDATE `Orders` SET `customerID`=:payloadCustomerID WHERE Orders.orderID = :payloadIDNumber
UPDATE `Paintings` SET `orderID`=:payloadIDNumber WHERE Paintings.paintingID =:payloadPaintingID

--ordersToGalleries Delete
DELETE FROM `OrdersToGalleries` WHERE OrdersToGalleries.orderID = :payloadOrderIDNumber AND OrdersToGalleries.galleryID = :payloadGalleryIDNumber



-- Paintings Page
--Get all columns from Orders to populate table
SELECT * FROM Paintings

--Insert into Paintings with artistID, artType, price, galleryID
INSERT INTO `Paintings`(`artistID`, `artType`, `price`, `galleryID`) VALUES (:payloadArtistID,:payloadArtType,:payloadPrice,:payloadGalleryID)

--Delete from Paintings the user specified Paintings when delete button is clicked
DELETE FROM `Paintings` WHERE Paintings,paintingID = :payloadIDNumber

--Update Paintings using the user specified painting and using user input
UPDATE `Paintings` SET `artistID`=:payloadArtistID,`artType`=:payloadArtType,`price`=:payloadPrice,`galleryID`=:payloadGalleryID,`orderID`=:payloadOrderID WHERE Paintings,paintingID = :payloadIDNumber
INSERT INTO `OrdersToGalleries` (`galleryID`, `orderID`) VALUES (:payloadGalleryID, :payloadOrderID) --update the M:M table if needed
UPDATE `OrdersToGalleries` SET `galleryID`=:payloadGalleryID WHERE `orderID`=:payloadOrderID --update M:M table if there's a new orderID

-- Search Page
--Get all columns from the database based on user selected checkboxes to populate search table
SELECT * FROM :payloadSearchDatabase WHERE :payloadSearchType = :payloadSearchForm