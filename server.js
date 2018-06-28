const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Set port for heroku or default to 3000
const port = process.env.PORT || 3000;

var app = express();

//Register Partials dir
hbs.registerPartials(__dirname + '/views/partials');
//set handlebars view engine using hbs => https://www.npmjs.com/package/hbs
app.set('view engine', 'hbs');

//Custom middleware
app.use( (req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log( log );
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err){
			console.log('Unable to write to server log');
		}
	} );
	next(); //App winn not run past middleware until next()
});

// app.use( (req, res, next)=>{
// 	res.render('maintenance.hbs');
// });

//middleware
app.use( express.static(__dirname + '/public') ); 

//register helpers
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',( text )=>{
	return text.toUpperCase();
});

app.get('/', ( req, res )=>{
	//res.send({name: 'Erin', likes: ['Amy', 'Penelope']});
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my node website!!'
	});
});

app.get('/about',(req,res)=>{
	//res.send('About Page!!');
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects',(req,res)=>{
	//res.send('About Page!!');
	res.render('projects.hbs', {
		pageTitle: 'My Projects Page',
	});
});

app.get('/bad', ( req, res )=>{
	res.send({errorMessage: 'Unable to process request'});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});