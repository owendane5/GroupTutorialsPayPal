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

- Inside the file we need to define axios
- Next create payment function