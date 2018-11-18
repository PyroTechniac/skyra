const { IPCMonitor, ToJSON } = require('../../index');

module.exports = class extends IPCMonitor {

	run({ guildID, channelID }) {
		const guild = this.client.guilds.get(guildID);
		if (guild) {
			const channel = guild.channels.get(channelID);
			if (channel) return ToJSON.channel(channel);
		}
		return null;
	}

};