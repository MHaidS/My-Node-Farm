//*******************************************
// +++++ CORE MODULES +++++
const fs = require('fs');
const http = require('http'); //11. Creating a Simple Web Server
const url = require('url'); //12. Routing
// ++++++++++++++++++++++++
// 20.1. require 3rd party module 'slugify' & save in var 'slugify'
const slugify = require('slugify');
// 17.2 import replaceTemplate.js to this module, index.js; the dot ( . ) points to the loc where this module is in, this root folder & fr here we go to modules where we have replaceTemplate & just like w/ other modules, we don't need the .js; this is now going to return what we have exported here w/ module.exports, the anonymous function; save it to any var name, replaceTemplate, in tbis case
const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////////////
// FILES

//////////////////////////////////////////////
// SERVER

// *******************************
// ----- synchronous version -------
// top level code or code outside the callback function only gets executed once
// before anything happens, it will read the data fr the JSON file & then parse into an obj.
// 14. HTML Templating: Building the Templates
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OVERVIEW!");
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else if (pathName === "/api") {
//     // this has access to the top level code bec. of the scope chain
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

// ===============================================================
// 15. HTML Templating: Filling the Templates
// SERVER
// 15.4. replaceTemplate is a function w/c takes in a template 'temp', & a 'product';
// const replaceTemplate = (temp, product) => {
//   // 15.5. let's create a variable called 'output'; one trick here is to use a regex instead of quotes bec. there might be multiple instances of this placeholder & then use the g-flag w/c means global w/c will make the placeholders get replaced & not just the 1st one that occurs
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

// // 15.1. these are executed once, rt. at the beginning when we load up these applications
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   const pathName = req.url;
//   // Overview page
//   if (pathName === "/" || pathName === "/overview") {
//     // 15.2. send this tempOverview as the response & set content type to HTML
//     res.writeHead(200, { "Content-type": "text/html" });
//     // 15.3. remember that dataObj is an array of 5objs in JS in data; we have to loop through it & replace each of the placeholders in the template w/ the actual data fr the current product; so let's loop through dataObj w/ a map & it will return something that will be saved in a new array; what map does is accept a callback function w/c gets the current element as the argument; so the element of the current loop will then be saved into an array; the element 'el' is what holds the data & each of these is now an obj w/c contains the data in each of these properties
//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");
//     // 15.4. replace console.log;
//     // console.log(cardsHtml);
//     const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
//     // 15.5. respond w/ output instead
//     // res.end(tempOverview);
//     res.end(output);

//     // Product page
//   } else if (pathName === "/product") {
//     res.end(tempOverview);

//     // API
//   } else if (pathName === "/api") {
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);

//     // Not found
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

// // ==============================
// // http://127.0.0.1:8000/
// // marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % node index.js
// // Listening to requests on port 8000
// ===============================================================
// 16. Parsing Variables fr URLs

// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   // 16.1. log req.url to the console & the result of using 'url.parse' on this URL
//   // console.log(req.url);
//   // console.log(url.parse(req.url, true));
//   // BROWSER: http://127.0.0.1:8000/product?id=0  ===> Page not found!
//   // TERMINAL:
//   // /product?id=0
//   // Url {
//   //   protocol: null,
//   //   slashes: null,
//   //   auth: null,
//   //   host: null,
//   //   port: null,
//   //   hostname: null,
//   //   hash: null,
//   //   search: '?id=0',
//   //   query: [Object: null prototype] { id: '0' },
//   //   pathname: '/product',
//   //   path: '/product?id=0',
//   //   href: '/product?id=0'
//   // }

//   // 16.2. create 2 variables 'query' & 'pathname' using ES6 destructuring;
//   const { query, pathname } = url.parse(req.url, true);
//   // const pathName = req.url;

//   // Overview page
//   if (pathname === "/" || pathname === "/overview") {
//     res.writeHead(200, { "Content-type": "text/html" });

//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");

//     const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
//     // 15.5. respond w/ output instead
//     // res.end(tempOverview);
//     res.end(output);

//     // Product page
//   } else if (pathname === "/product") {
//     // 16.3. log 'query' to the console
//     // console.log(query);
//     // BROWSER: http://127.0.0.1:8000/product?id=0  ===>  This is the PRODUCT
//     // TERMINAL:
//     // marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % node index.js
//     // Listening to requests on port 8000
//     // [Object: null prototype] { id: '0' }

//     // 16.4. create var 'product' equal to data obj at position 'query.id'
//     res.writeHead(200, { "Content-type": "text/html" });
//     const product = dataObj[query.id];
//     const output = replaceTemplate(tempProduct, product);
//     // res.end("This is the PRODUCT");
//     res.end(output);

//     // API
//   } else if (pathname === "/api") {
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);

//     // Not found
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

// // **************************
// // http://127.0.0.1:8000/product?id=0
// // marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % node index.js
// // Listening to requests on port 8000
//
// ===============================================================
// 17. Using Modules 2: Our Own Modules
// 18. Introduction to NPM & the package.json File
// 19. Types of Packages & Installs
// 20. Using Modules 3: 3rd Party Modules
// 21. Package Versioning & Updating
// 21.1. to check outdated packages on the Terminal
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm outdated   ===> all are up-to-date
// 21.2. for ex., slugigy can be downgraded by installing a lower version (npm install slugify@1.0.0) then run 'npm outdated' again & this shd reflect the outdated ver; to update to minor ver, add ( ~ ) before the ver.no. then run 'npm outdated' & this shd show the minor ver./patch release/minor fixes (1.0.2), it will only be updated to it when 'npm update slugify' is entered; w/o the ( ~ ) before the ver.no. in package.json, it will be updated to latest ver. "^1.6.6"; or you can just 'npm install slugify@1.6.6' directly after confirming the latest version
// 21.3. we can also delete packages so let's install express so that we can remove it later (npm i express); when it's done, let uninstall it using cmd (npm uninstall express)
// 21.4. don't share the 'node_modules' folder esp. on your github repo as you may end up w/ tons of files w/c will significantly slow down the upload; what you can do is del this folder when uploading on the github repo & fr another computer, download the proj then 'npm install' to get back the 'node_modules' again; it is necessary though to share the package.json & package-lock.json file to make sure that the same ver.nos. are going to be used by the other devs

// 19.1. install a regular dependency, 'slugify'(Slugifies a String); this will create a new field 'dependencies' in the package.json file
// TERMINAL ===>
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm install slugify
// 19.2. nxt, install a development dependency, 'nodemon'(will automatically start the server whenever there is a change); to specify that this is a devt. dependency, add --save-dev; this will create a new field 'devDependencies' in the package.json file; after both dependencies were installed, it also created a 'node_modules' folder w/c has all the dependencies of this proj.
// TERMINAL ===>
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm install nodemon --save-dev
// 19.3. to make 'nodemon' globally-available across all projects, install it in the terminal as shown below; might have worked on Windows but this recvd an error though if you're on a Mac; put sudo before the command & it will ask for your pw; now, instead of 'node index.js', enter 'nodemon index.js'; now, if we hadn't installed nodemon globally, we can edit the "scripts" field in package.json ("start": "nodemon index.js") w/c generated a placeholder ("test": "echo \"Error: no test specified\" && exit 1") when 'npm init' was ran; then on the terminal, 'npm run start' or 'npm start' will trigger the cmd
// TERMINAL ===>
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm i nodemon --global ===> ERROR RECVD
// npm ERR! The operation was rejected by your operating system.
// npm ERR! It is likely you do not have the permissions to access this file as the current user
// ------------------------------------
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % sudo npm i nodemon --global

// ++++++++++++++++++++++++++++++++++++++++

// 18.1. whenever we start a new proj., enter 'npm init' on the terminal; this will create a 'package.json' file w/c is kind of a config file where all kinds of data about the proj. is stored
// ++++++++++++++++++++++++++++++++++++++++
// TERMINAL ===>
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm init
// This utility will walk you through creating a package.json file.
// It only covers the most common items, and tries to guess sensible defaults.

// See `npm help init` for definitive documentation on these fields
// and exactly what they do.

// Use `npm install <pkg>` afterwards to install a package and
// save it as a dependency in the package.json file.

// Press ^C at any time to quit.
// package name: (1-node-farm) node-farm
// version: (1.0.0)
// description: learning node.js
// entry point: (index.js)
// test command:
// git repository:
// keywords:
// author: Reese S.
// license: (ISC)
// About to write to /Users/marizzehaideesalanga/Documents/UDEMY-Jonas/Node Express MongoDB&More/JSNodeWorkDir/1-node-farm/package.json:

// {
//   "name": "node-farm",
//   "version": "1.0.0",
//   "description": "learning node.js",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "author": "Reese S.",
//   "license": "ISC"
// }

// Is this OK? (yes)
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm %
// ++++++++++++++++++++++++++++++++++++++++

// 17.1. transfer fr index.js replaceTemplate() to replaceTemplate.js
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// 20.3. create an array of all the slugs
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
// TERMINAL ===>
// [nodemon] restarting due to changes...
// [nodemon] starting `node index.js`
// [
//   'fresh-avocados',
//   'goat-and-sheep-cheese',
//   'apollo-broccoli',
//   'baby-carrots',
//   'sweet-corncobs'
// ]
// Listening to requests on port 8000
// 20.2. a 'slug' is just the last part of a URL that contains a unique string that identifies the resource the website is displaying; in this case, when the detail page for fresh avocados is opened, its '?id=0' instead of 'fresh-avocados'
// console.log(slugify("Fresh Avocados", { lower: true }));
// TERMINAL ===>
// fresh-avocados
// Listening to requests on port 8000

const server = http.createServer((req, res) => {
  // 16.2. create 2 variables 'query' & 'pathname' using ES6 destructuring;
  const { query, pathname } = url.parse(req.url, true);
  // const pathName = req.url;

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    // 16.3. log 'query' to the console
    // console.log(query);
    // BROWSER: http://127.0.0.1:8000/product?id=0  ===>  This is the PRODUCT
    // TERMINAL:
    // marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % node index.js
    // Listening to requests on port 8000
    // [Object: null prototype] { id: '0' }

    // 16.4. create var 'product' equal to data obj at position 'query.id'
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // res.end("This is the PRODUCT");
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

// **************************
// http://127.0.0.1:8000/product?id=0
// marizzehaideesalanga@Marizzes-MacBook-Pro 1-node-farm % npm start

// > node-farm@1.0.0 start
// > nodemon index.js

// [nodemon] 2.0.22
// [nodemon] to restart at any time, enter `rs`
// [nodemon] watching path(s): *.*
// [nodemon] watching extensions: js,mjs,json
// [nodemon] starting `node index.js`
// Listening to requests on port 8000
// ===============================================================
// 22. Setting Up Prettier in VS Code

// ===============================================================
// 23. Recap & What's Next

// ===============================================================
//

// ===============================================================
//
