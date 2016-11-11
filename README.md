# CodeScanner

##This app allows user to search product or upload new product to server by scanning bar code through a camera on a phone.

###Tech Stack: 
- React Native (mobile)
- React (web)
- Redux 
- Node 
- Express
- MongoDB

###Scripts:
- start server: npm run server
- start ios simulator: npm run ios

###Endpoints
- '/web': get all product
- '/addProduct': upload product
- '/checkCode': search scanned product in database
- '/removeProduct': remove product in database

###Note
- currently only support iOS
- Web version: https://morning-eyrie-71286.herokuapp.com/

###Event Flow
<img src="https://github.com/ylo-us/codeScanner/blob/master/flow_chart.png" width="501">
