import { Command, util : { fetchAvatar, streamToBuffer }, assetsFolder; } from; '../../index';
import Canvas from 'canvas';
import { readFile } from 'fs-nextra';
import GIFEncoder from 'gifencoder';
import { join } from 'path';

export default class extends Command {

	public constructor(client: Client, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			requiredPermissions: ['ATTACH_FILES'],
			bucket: 2,
			cooldown: 30,
			description: (language) => language.get('COMMAND_TRIGGERED_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_TRIGGERED_EXTENDED'),
			runIn: ['text'],
			usage: '[user:username]'
		});

		this.spam = true;
		this.template = null;
	}

	public async run(msg, [user = msg.author]) {
		const attachment = await this.generate(user);
		return msg.channel.send({ files: [{ attachment, name: 'triggered.gif' }] });
	}

	public async generate(user) {
		const imgTitle = new Canvas.Image();
		const imgTriggered = new Canvas.Image();
		const encoder = new GIFEncoder(350, 393);
		const canvas = Canvas.createCanvas(350, 393);
		const ctx = canvas.getContext('2d');

		imgTitle.src = this.template;
		imgTriggered.src = await fetchAvatar(user, 512);

		const stream = encoder.createReadStream();
		encoder.start();
		encoder.setRepeat(0);
		encoder.setDelay(50);
		encoder.setQuality(200);

		const coord1 = [-25, -50, -42, -14];
		const coord2 = [-25, -13, -34, -10];

		for (let i = 0; i < 4; i++) {
			ctx.drawImage(imgTriggered, coord1[i], coord2[i], 400, 400);
			ctx.fillStyle = 'rgba(255 , 100, 0, 0.4)';
			ctx.drawImage(imgTitle, 0, 340, 350, 53);
			ctx.fillRect(0, 0, 350, 350);
			encoder.addFrame(ctx);
		}

		encoder.finish();

		return streamToBuffer(stream);
	}

	public async init() {
		this.template = await readFile(join(assetsFolder, './images/memes/triggered.png'));
	}

}