<h1>Crypto Portfolio Website</h1>

<p>A web application for tracking and managing cryptocurrency investments. Built with React, Node.js, Express, and various crypto APIs.</p>

<h3><a href="https://sweet-gelato-b9751e.netlify.app/">Live Demo</a></h3>


https://user-images.githubusercontent.com/56216286/210632133-f8372981-86aa-46ef-8c4f-43b5a37882dd.mp4


<h2>Features</h2>

<ul>
  <li>Real-time tracking of portfolio value and individual coin prices</li>
  <li>Historical price data and charts for coins</li>
  <li>News feed and alerts for relevant market updates</li>
  <li>Secure login and account management</li>
</ul>

<h2>Getting Started</h2>

<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js and npm (latest versions recommended)</li>
  <li>MongoDB (local or cloud-based)</li>
</ul>

<h3>Installation</h3>

<ol>
  <li>Clone or download the repository</li>
  <li>Set up a <code>.env</code> file in the root directory with the following variables:
    <ul>
      <li><code>DATABASE_URI</code>: your MongoDB connection string</li>
      <li><code>DATABASE_PASSWORD</code>: your MongoDB password</li>
      <li><code>JWT_SECRET</code>: a secret string for encrypting sessions</li>
      <li><code>JWT_EXPIRES_IN</code>: expiration time for JWT tokens</li>
    </ul>
  </li>
  <li>Open "server" folder and run <code>npm install</code> and  <code>npm start</code> to install all project dependecies and start the server on localhost:3000</li>
   <li>Open "client" folder and run <code>npm install</code> and <code>npm run dev</code> to install all project dependecies and start the front with vite</li>
</ol>

<h2>Built With</h2>

<ul>
  <li><a href="https://reactjs.org/">React</a> - JavaScript library for building user interfaces</li>
  <li><a href="https://nodejs.org/">Node.js</a> - JavaScript runtime for building server-side applications</li>
  <li><a href="https://expressjs.com/">Express</a> - Web application framework for Node.js</li>
  <li><a href="https://www.mongodb.com/">MongoDB</a> - NoSQL database for storing user and portfolio data</li>
</ul>

<h2>Authors</h2>

<ul>
  <li>yoni2528(https://github.com/yoni2528) - Initial development and maintenance</li>
</ul>

<h2>Future Development</h2>

<ul>
  <li>Implement portfolio analysis and optimization tools</li>
  <li>Integrate with exchanges for automatic trade tracking</li>
  <li>Add additional news sources and alerts</li>
</ul>
