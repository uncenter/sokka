import type { FlatESLintConfig } from 'eslint-define-config';

import { bold, dim } from 'kleur/colors';

import { log } from './log';

export const pushPart = async (
	configArray: FlatESLintConfig[],
	newConfigs: FlatESLintConfig[] | Promise<FlatESLintConfig[]>,
) => {
	const resolvedNewConfigs = await newConfigs;
	configArray.push(...resolvedNewConfigs);
};

export const suggestPart = (name: string) => {
	log.info(
		`${`The \`${name}\` config part can be enabled with `}${bold(`\`${name}: true\``)}!`,
	);
	log.info(
		`${dim(`Disable this suggestion by setting \`${name}: false\`.`)}`,
	);
};
