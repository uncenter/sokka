import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/utils.ts'],
	format: ['esm'],
	dts: true,
	clean: true,
});
