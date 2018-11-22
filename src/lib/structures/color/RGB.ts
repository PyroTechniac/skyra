/* eslint id-length: ["error", { "exceptions": ["h", "s", "l", "r", "g", "b", "d", "p", "q", "t"] }] */
export class RGB {

	private r: number;
	private g: number;
	private b: number;

	/**
	 * RGB Parser.
	 * @param r Red value. (0 - 255)
	 * @param g Green value. (0 - 255)
	 * @param b Blue value. (0 - 255)
	 */
	public constructor(r: number | string, g: number | string, b: number | string) {
		this.r = Number(r);
		this.g = Number(g);
		this.b = Number(b);

		this.valid();
	}

	public valid(): boolean {
		if (this.r < 0 || this.r > 255) throw `Invalid Red range. Must be between 0 and 255, and it is ${this.r}`;
		if (this.g < 0 || this.g > 255) throw `Invalid Green range. Must be between 0 and 255, and it is ${this.g}`;
		if (this.b < 0 || this.b > 255) throw `Invalid Blue range. Must be between 0 and 255, and it is ${this.b}`;
		return true;
	}

	public get hex(): HEX {
		return new HEX(this.r.toString(16), this.g.toString(16), this.b.toString(16));
	}

	public get rgb(): RGB {
		return this;
	}

	public get hsl(): HSL {
		const r = this.r / 255;
		const g = this.g / 255;
		const b = this.b / 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h;
		let s;
		const l = (max + min) / 2;

		if (max === min) {
			/* Achromatic */
			h = 0; s = 0;
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = ((g - b) / d) + (g < b ? 6 : 0);
					break;
				case g: h = ((b - r) / d) + 2;
					break;
				case b: h = ((r - g) / d) + 4;
				// no default
			}
			h /= 6;
		}
		return new HSL(Math.round(h * 360), Math.round(s * 100), Math.round(l * 100));
	}

	public get b10(): B10 {
		return this.hex.b10;
	}

	public toString(): string {
		return String(`rgb(${this.r}, ${this.g}, ${this.b})`);
	}

}

import { B10 } from './B10';
import { HEX } from './HEX';
import { HSL } from './HSL';