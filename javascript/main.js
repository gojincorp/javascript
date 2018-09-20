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
	function myProm(num) {
		return new Promise(function(resolve, reject) {
			if (num === 13) return reject(new Error("Unlucky number..."));
			resolve("OK (" + num + ")");
		});
	}
	
	function* myGen() {
		let dataA;
		let dataB;
		let dataC;
		let dataD;
		try {
			dataA = yield myProm(1);
			dataB = yield myProm(3);
			dataC = yield myProm(8);
			dataD = yield myProm(22);
			throw(new Error("FOOBAR"));
		} catch (err) {
			console.log("myGen::catch: " + err.message);
			//throw err;
		}
		console.log("HAPPY" + dataA + dataB + dataC + dataD);
	}
	
	function myGrun(g) {
		const it = g();
		(function iterate(val) {
			const x = it.next(val);
			if (!x.done) {
				x.value.then(iterate).catch(err => it.throw(err));
			} else {
				setTimeout(iterate, 0, x.value);
			}
		}());
	}
	
	myGrun(myGen);
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