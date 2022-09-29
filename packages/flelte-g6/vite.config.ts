import { sveltekit } from '@sveltejs/kit/vite';
import unocss from 'unocss/vite';
import type { UserConfig } from 'vite';

import transformerDirective from '@unocss/transformer-directives';

const config: UserConfig = {
	plugins: [
		unocss({
			transformers: [transformerDirective()]
		}),
		sveltekit()
	]
};

export default config;
