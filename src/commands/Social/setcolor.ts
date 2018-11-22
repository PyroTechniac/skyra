import { Color, Command, MessageEmbed } from '../../index';

export default class extends Command {

	public constructor(client: Client, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			aliases: ['setcolour'],
			requiredPermissions: ['EMBED_LINKS'],
			bucket: 2,
			cooldown: 10,
			description: (language) => language.get('COMMAND_SETCOLOR_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_SETCOLOR_EXTENDED'),
			usage: '<color:string>'
		});
		this.spam = true;
	}

	public async run(msg, [input]) {
		const { hex, b10 } = Color.parse(input);

		await msg.author.settings.update('color', hex.toString().slice(1));
		return msg.sendEmbed(new MessageEmbed()
			.setColor(b10.value)
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ size: 128 }))
			.setDescription(msg.language.get('COMMAND_SETCOLOR', hex)));
	}

}