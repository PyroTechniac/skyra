const { structures: { Extendable } } = require('../index');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, ['MessageEmbed']);
	}

	extend(content) {
		if (typeof content === 'undefined') return this;

		if (Array.isArray(content)) content = content.join('\n');
		if (content.length < 2048 && typeof this.description === 'undefined') {
			this.description = content;
			return this;
		}
		let init = content;
		let i;
		let x;

		for (i = 0; i < content.length / 1020; i++) {
			if (init.length < 1020) return this.addField('\u200B', init);
			x = init.substring(0, 1020).lastIndexOf('\n');
			this.addField('\u200B', init.substring(0, x));
			init = init.substring(x, init.length);
		}
		return this;
	}

};
