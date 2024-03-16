import type { SokkaConfig, UserOptions } from './types';
import type { FlatESLintConfig } from 'eslint-define-config';

import { bold } from 'kleur/colors';
import { isPackageExists } from 'local-pkg';

import { pushPart, suggestPart } from './config';
import { log } from './log';

export function createConfig(config: SokkaConfig) {
	return async function (options?: UserOptions): Promise<FlatESLintConfig[]> {
		options = options ?? {};
		for (const [name, part] of Object.entries(config.parts ?? {})) {
			if (options.parts[name] === undefined) {
				for (const pkg of part?.enablers?.packages ?? []) {
					if (isPackageExists(pkg)) suggestPart(name);
				}
			}

			for (const pkg of part?.ensureInstalled ?? []) {
				if (!isPackageExists(pkg)) {
					log.error(
						`Required peer dependency ${bold(pkg)} is not installed!`,
					);
				}
			}
		}

		const result: FlatESLintConfig[] = [];

		if (options.ignores && options.ignores.length > 0) {
			result.push({ ignores: options.ignores });
		}

		if (options.globals && options.globals.length > 0) {
			result.push({
				languageOptions: {
					globals: options.globals.reduce((acc, curr) => {
						// @ts-expect-error: FML.
						return { ...acc, [curr]: config.globals[curr] };
					}, {}),
				},
			});
		}

		for (const [name, part] of Object.entries(config.parts ?? {})) {
			// @ts-expect-error: FML.
			if (options?.parts[name] ?? part.enabled) {
				await pushPart(
					result,
					await part.func(
						typeof options?.parts[name] !== 'boolean'
							? options?.parts[name]
							: {},
					),
				);
			}
		}

		if (options.rules !== undefined) {
			result.push({ rules: options.rules });
		}

		if (options.extraConfigs) {
			result.push(...options.extraConfigs);
		}

		return result;
	};
}

export type { AsyncFlatConfig } from './types';
