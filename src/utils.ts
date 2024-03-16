export const load = async <T>(
	module: T | Promise<T>,
): Promise<T extends { default: infer U } ? U : T> => {
	const resolved = await module;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	return (resolved as any).default ?? resolved;
};
