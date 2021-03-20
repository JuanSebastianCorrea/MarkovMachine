const { MarkovMachine } = require('./markov');

describe('Markov Machine', () => {
	test('makes chains', () => {
		let mm = new MarkovMachine('aa bb cc aa BB aa CC BB');

		expect(mm.chains).toEqual(
			new Map([
				[ 'aa', [ 'bb', 'BB', 'CC' ] ],
				[ 'bb', [ 'cc' ] ],
				[ 'cc', [ 'aa' ] ],
				[ 'BB', [ 'aa', null ] ],
				[ 'CC', [ 'BB' ] ]
			])
		);
	});

	test('choice selects randomly from an array', () => {
		expect(MarkovMachine.choice([ 'aa', 'aa', 'aa' ])).toEqual('aa');
		expect([ 'aa', 'bb', 'cc' ]).toContain(MarkovMachine.choice([ 'aa', 'bb', 'cc' ]));
	});

	test('generates semi-predictable text', () => {
		let mm = new MarkovMachine('a b c');
		expect([ 'a b c', 'b c', 'c' ]).toContain(mm.makeText());
	});
});
