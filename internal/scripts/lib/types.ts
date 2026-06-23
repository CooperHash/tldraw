import { T } from '@tldraw/validate'

export const PackageJson = T.object({
	name: T.string,
	private: T.boolean.optional(),
	workspaces: T.arrayOf(T.string).optional(),
	scripts: T.dict(T.string, T.nullable(T.string)).optional(),
	dependencies: T.dict(T.string, T.string).optional(),
	devDependencies: T.dict(T.string, T.string).optional(),
	peerDependencies: T.dict(T.string, T.string).optional(),
}).allowUnknownProperties()
export type PackageJson = T.TypeOf<typeof PackageJson>

export const TsConfigJson = T.object({
	references: T.arrayOf(
		T.object({
			path: T.string,
		})
	).optional(),
}).allowUnknownProperties()
export type TsConfigJson = T.TypeOf<typeof TsConfigJson>
