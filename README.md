Description:
This application is an instant messenger application that allows users to create accounts, and login using passport authentication.
They can text in a chat all window, or create new chat windows that are shared with all users. All messages history for the chat-all and group chat windows is saved
in the database. They can also log out.

How To Run:
I generally run the project doing "npm start" or "npx nodemon index" either or should work.
However since nodemon uses node.child.spawn and not node.child.fork, ports are occasionally left open and cannot be
listened to even though you were the only one on the port. Sometimes this occurs extremely frequently. I have not found any way to stop this from happening, 
besides using kill [pid] of the nodes child. Once connected it should be working fine.
