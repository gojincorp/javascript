$(function() {
	'use strict';
	console.log('Test:  ' + paper);

	//paper.install(window);
	paper.setup('mainCanvas');
	
	/*
	var c;
	for (var x=25; x < 400; x+=50) {
		for (var y=25; y < 400; y+=50) {
			c = Shape.Circle(x, y, 20);
			c.fillColor = 'green';
		}
	}
	*/
	var c = paper.Shape.Circle(200, 200, 80);
	c.fillColor = 'black';
	var text = new paper.PointText(200, 200);
	text.justification = 'center';
	text.fillColor = 'white';
	text.fontSize = 20;
	text.content = 'hello world';
	
	var tool = new paper.Tool();
	tool.onMouseDown = function(event) {
		var c = paper.Shape.Circle(event.point.x, event.point.y, 20);
		c.fillColor = 'green';
	};
	paper.view.draw();
	
	const cards = [];
	for (let suit of ['H', 'C', 'D', 'S']) {
		for (let value = 1; value <= 13; value++) {
			cards.push({suit, value});
		}
	}
	function cardToString(c) {
		const suits = {'H': '\u2665', 'C': '\u2663', 'D': '\u2666', 'S': '\u2660'};
		const values = {1: 'A', 11: 'J', 12: 'Q', 13: 'K'};
		
		for (let i=2; i<=10; i++) {
			values[i] = i;
		}
		return values[c.value] + suits[c.suit];
	}
	console.log(cards.filter(c => c.value > 10).map(cardToString));
	console.log(cards.filter(c => c.value === 11).map(c => ({ foo: 'test', bar: c.value})));

	// TESTING SYMBOL SUPPORT IN JQUERY
	// ================================
	const mySym = Symbol('foo');
	console.log(typeof mySym);
	//console.log([mySym]);
	const symbol1 = Symbol('bar');
	const myObj = { a: 1, b: 2, c: 3, "d": 4, [mySym]: 5};
	console.log(Object.keys(myObj));
	console.log(Reflect.ownKeys(myObj));
	console.log(Object.getOwnPropertyNames(myObj));
	console.log(Object.getOwnPropertySymbols(myObj));
	console.log(myObj[mySym]);
	
	// TESTING CLASS IMPLEMENTATION
	// ============================
	class Fibonacci {
		[Symbol.iterator]() {
			let a = 0, b = 1;
			return {
				next() {
					let rval = {value: b, done: false};
					b += a;
					a = rval.value;
					return rval;
				}
			}
		}
	}
	let myFib = new Fibonacci();
	let i = 9;
	for (let fibNum of myFib) {
		console.log(fibNum);
		if(i-- < 0) break;
	}
	
	function* rainbow () {
		yield 'red';
		yield 'green';
		yield 'blue';
	}
	function* fibFunc () {
		let a = 0, b = 1;
		for (;;) {
			let rval = b;
			b += a;
			a = rval;
			yield rval;
		}
	}
	const myRainbow = rainbow();
	console.log(myRainbow.next());
	console.log(myRainbow.next());
	console.log(myRainbow.next());
	console.log(myRainbow.next());
	i = 9;
	for (let fibNum of fibFunc()) {
		console.log(fibNum);
		if(i-- < 0) break;
	}
	
	function* interrogate() {
		const name = yield "What is your name?";
		const color = yield "What is your favorite color?";
		return `${name}'s favorite color is ${color}.`;
	}
	const myInterrogate = interrogate();
	console.log(myInterrogate.next());
	console.log(myInterrogate.next('Eric'));
	console.log(myInterrogate.next('Purple'));
});

/*
(function() {
	'use strict';
	const iterable1 = new Object();

	iterable1[Symbol.iterator] = function* () {
	  yield 1;
	  yield 2;
	  yield 3;
	};

	console.log([...iterable1]);
	// expected output: Array [1, 2, 3]
}())
*/