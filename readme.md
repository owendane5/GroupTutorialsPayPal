# Adding Paypal Checkout Using RestApi

### There are a few ways of doing this such as downloading the paypal SDK, but for this we will stick with the Api.

## *Step One: Setting up Node.js Application*

- Open up a new project in visual studio code
- After new project is open make sure to install the necessary node.js components
- Install Node (Npm)
- Head to (https://nodejs.org/en) and download.

- Second, install express.  Express hbs view is going to be our node.js template for this demo.
- In the terminal run *npm install express* and follow instructions.

- Third, install hbs template for ease of use.  
- In the terminal run *express --view=hbs*
- Run *npm i* for dependencies.

- Fourth, install Axios. Axios will be used to make the http requests to PayPal, which is the simplest way.
- In the terminal run *npm install axios* to install axios.

- Also install .env if you do not have it
- In the terminal run *npm install dotenv*

## *Step Two: Set up PayPal account*

- Head over to (https://developer.paypal.com/dashboard/applications/sandbox) and you can login with your normal paypal account as we will be using the sandbox demo
- create account if you do not have one

- Once logged in you will see a demo application already created for you under Apps * Credentials. You can also view Business and Personal accounts for testing under Testing Tools.
- You need to click on Create App then add app name and select merchant. From there select Sandbox Business account and Create App.
- Next navigate over to sandbox accounts under testing tools and create a new business and personal account.

- Now click on the app you made and you will need these three things
    - Client ID
    - Secret
    - URL (find at *https://developer.paypal.com/api/rest/*)

## *Step Three: Application changes*

- First step is to create a .env
- Now store those three credentials you have gathered. (CLIENT_ID, SECRET, BASE_URL)

- Second, please create a services folder for our axios function.
- Inside the folder create a file called paypalServices.js
- Here you will defining how you want to handle the order (Please use reference from *https://developer.paypal.com/docs/api/orders/v2/*)

### index.hbs
- Add button form with pay route and post.

### paypalServices.js

- Import axios for HTTP requests.
- Define generateAccessToken function:
- Send POST request to /v1/oauth2/token with client credentials.
- return the access token from the response.
- Define paypalService object with two methods:
- createOrder:
- Get access token using generateAccessToken.
- Send POST request to /v2/checkout/orders with order data.
- Return the approval link from the response.
- capturePayment:
- Get access token using generateAccessToken.
- Send POST request to /v2/checkout/orders/{orderId}/capture.
- Return the response data.
- Export paypalService object.

### purchase.js route
- Import express, paypalService, and router
- Define a POST route at /pay.
- Create an orderData object that contains the details of the purchase.
- Use the paypalService.createOrder method to create an order with the orderData.
- Redirect the user to the PayPal URL returned by the createOrder method.
- Handle any errors by sending an error message as a response.
- Define a GET route at /complete-order.
- Use the paypalService.capturePayment method to capture the payment using the token from the query parameters.
- Send a success message if the payment is captured successfully.
- Handle any errors by sending an error message as a response.
- Define a GET route at /cancel-order.
- Redirect the user to the home page.
- Export the Router:


### app.js 
- Import Dotenv
- Define routes and use - var purchaseRouter = require('./routes/purchase'); - app.use('/purchase', purchaseRouter);


## *Trouble Shooting Tips*

- Check for Missing dependencies
- Make sure .env is set up correctly with the correct info
- Check endpoints

- For help on this process use https://developer.paypal.com/api/rest/