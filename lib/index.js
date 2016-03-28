var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Tank = require('./tank');
var tank = new Tank();
var Game = require('./game')
var game = new Game(context, tank);
