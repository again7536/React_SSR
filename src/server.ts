import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const app = Express();
const port = 3000;

//Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req:Express.Request, res:Express.Response){

}
// function renderFullPage(html, preloadedState) {

// }

app.listen(port)