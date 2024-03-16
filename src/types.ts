import type { FlatESLintConfig, Rules } from 'eslint-define-config';

export type AsyncFlatConfig = Promise<FlatESLintConfig[]>;

export type Part = {
	func: (options: unknown) => AsyncFlatConfig;
	enabled: boolean;
	enablers?: {
		packages?: Array<string>;
	};
	ensureInstalled?: string[];
};

export type SokkaConfig = {
	/**
	 *  Parts to provde to users of the configuration function.
	 */
	parts?: {
		[name: string]: Part;
	};
	/**
	 *  Globals to provde to users of the configuration function.
	 */
	globals?: Record<string, boolean>;
};

export type UserOptions = {
	/**
	 * Extra ignore glob patterns to pass to ESLint in addition to the default set.
	 */
	ignores?: Array<string>;

	/**
	 * Global names to provide to ESLint.
	 */
	globals?: Array<string>;

	/**
	 * Parts to enable.
	 */
	parts?: Record<string, boolean>;

	/**
	 * Extra rule levels and options to specify, overriding the presets previous loaded
	 * in enabled config parts.
	 */
	rules?: Rules;

	/**
	 * Additional flat configurations to pass to ESLint.
	 */
	extraConfigs?: FlatESLintConfig[];
};
