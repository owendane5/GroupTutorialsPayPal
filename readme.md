# Adding Paypal Checkout Using RestApi

### There are a few ways of doing this such as downloading the paypal SDK, but for this we will stick with the Api.

## *Step One: Setting up Node.js Application*

- Open up a new project in visual studio code
- After new project is open make sure to install the necessary node.js components
- Install Node (Npm)
- Head to (https://nodejs.org/en) and download.

- Second up is install express.  Express hbs view is going to be our node.js template for this demo.
- In the terminal run *npm install -g express* and follow instructions. (G for global installation)
- Then run *express --view=hbs*


## *Step Two: Set up PayPal account*

- Head over to (https://developer.paypal.com/dashboard/applications/sandbox) and you can login with your normal paypal account as we will be using the sandbox demo
- create account if you do not have one

- Once logged in you will see a demo application already created for you under Apps * Credentials. You can also view Business and Personal accounts for testing under Testing Tools.
- Click on Create App then add app name and select merchant. From there select Sandbox Business account and Create App.

