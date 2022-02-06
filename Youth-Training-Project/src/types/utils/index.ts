export type GetObjectArrayKeysType<T extends Array<{}>, U extends string> = T extends [infer F, ...infer R]
	? U extends keyof F
		? [F, ...GetObjectArrayKeysType<R & {}[], U>]
		: GetObjectArrayKeysType<R & {}[], U>
	: [];
