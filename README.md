# SpoonShot_Book_IMS

# SpoonShot_Book_IMS

Book Inventory Management System:

The project is built using MERN stack:

Steps to Run the project:
## Back-end
 1. git clone <repository name>'
 2. Open cloned repository using VSCode.
 3. cd <respository folder>
 4. Run 'npm install' in the terminal to install all dependencies for your backend server.
 5. In config/keys.js folder replace MONGO_URI value with your own database URL provided in mlab.com 
 6. To run backend run 'npm run server'
  
 ## Front-end
 1. cd client folder
 2. Run 'npm install' to install dependencies.
 3. Run 'npm start' to run server.
 
## Main Features of this System

1. There is an Owner of System who takes care of adding a new book to inventory, Updating number of books in inventory, remove a book from inventory.
2. All users can see books present in the inventory.
3. All users can search for a particular book, it returns all google APi books with max results =10 (this number can be changed) along with the availability of each book in inventory.

## Assumptions

1. For adding, updating, deleting of inventory only owner can perform so I have added to an extra field to enter password as "ali123" as an authorization. This value is hard-coded and can be changed anytime in the AddBook.js & BookList.js file in components folder.
2. In order to add a book in inventory, user has to input title(compulsory), author(optional), publisher(optional) names along with number of copies, this triggers retrieve matching books from Google API Books, from this list user click on appropriate book and it will be added to inventory and an unique book id is sent back to be saved by owner.
3. For updating number of records, we assume owner has book id that he has to input along with the password.
4. Point Number 3 applies same for deletion.

## Working
1. For searching books, to check which books returned by Google Books API are available in inventory I used dictionary to store combination of title and author name as a key and number of records as a value.

## Further Improvements:

1. For showing Large number of records Pagnination wil be an effective choice.
2. Better authorization for Owner.
3. Better Search process including author name and publisher name.
4. For updating, deleting records, can take title, author name as an input field instead of unique book id field, since it is hard to remember the unique book id values.
 
