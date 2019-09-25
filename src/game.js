﻿"use strict";

var Game = {
	background: [],
	objects: [],

	ready: false,

	// Start the game
	begin: function (canvas_id, width, height) {
		// Load graphics data
		getJSON("data/graphics.json", Graphics.load);

		// Get the canvas and graphics context
		Graphics.canvas = document.getElementById(canvas_id);
		Graphics.context = Graphics.canvas.getContext("2d");

		// Adjust the canvas
		Graphics.canvas.width = width;
		Graphics.canvas.height = height;

		// Catch key presses
		window.addEventListener("keydown", Input.keyPress);
		window.addEventListener("keyup", Input.keyRelease);

		// Start the game loop
		window.requestAnimationFrame(Game.loop);
	},

	// Load game data
	load: function () {
		// Start the game when everything is loaded
		if (Graphics.ready) {
			Game.ready = true;
		}
	},

	// The game loop
	loop: function (timestamp) {
		// Measure the time change since the last frame
		let delta = (timestamp - Game.timer) / 1000;
		Game.timer = timestamp;

		if (Game.ready) {
			// Update entities
			let obj;
			for (obj of Game.objects) {
				obj.update(delta);
			}

			// Draw a frame
			Graphics.render();
		}
		else {
			// Load game data
			Game.load();

			// Draw a loading screen
			Graphics.splash("Loading");
		}

		// Wait for the next draw cycle
		window.requestAnimationFrame(Game.loop);
	},
};

var getJSON = function (address, callback) {
	var xhttp = new XMLHttpRequest();

	// Prepare the callback to trigger when the request is complete
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let json = JSON.parse(this.responseText);
			callback(json);
		}
	};

	// Send the http request
	xhttp.open("GET", address, true);
	xhttp.send();
}