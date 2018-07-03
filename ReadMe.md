# SNACK API
This is a simple REST API to control the use of cards in a SNACK MACHINE. :)

## HOW TO USE
You just need to set up the enviromnent and run the app server.
1. Run `npm install`
2. Run `node app.js`


## API

| VERB | QUERY | EXAMPLE | DESCRIPTION |
| GET | /CARDS/FIND/:ID | /CARDS/FIND/1 | FIND CARD BY ID |
| POST | /CARDS/loadbalance/:ID | /CARDS/loadbalance/1 | UPDATES BALANCE'S CARD FOR TODAY |
| GET | /CARDS/withdraw_and_update/:ID&:AMOUNT | /CARDS/FIND/1&2 | PERFORMS A WITHDRAW IF THE CARD HAS SOME POSITIVE BALANCE |
