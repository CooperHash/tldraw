import { LazyConfig } from 'lazyrepo'

const config = {
	baseCacheConfig: {
		include: [
			'<rootDir>/package.json',
			'<rootDir>/yarn.lock',
			'<rootDir>/lazy.config.ts',
			'<rootDir>/internal/config/**/*',
			'<rootDir>/internal/scripts/**/*',
			'package.json',
		],
		exclude: [
			'<allWorkspaceDirs>/coverage/**/*',
			'<allWorkspaceDirs>/dist*/**/*',
			'**/*.tsbuildinfo',
		],
	},
	scripts: {
		build: {
			baseCommand: 'exit 0',
			runsAfter: {
				prebuild: {},
			},
			workspaceOverrides: {
				'packages/*': {
					runsAfter: { prebuild: { in: 'self-only' } },
					cache: {
						inputs: ['api/**/*', 'src/**/*'],
					},
				},
			},
		},
		dev: {
			execution: 'independent',
			runsAfter: { predev: {} },
			cache: 'none',
		},
		'build-types': {
			execution: 'top-level',
			baseCommand: `tsx <rootDir>/internal/scripts/typecheck.ts`,
			cache: {
				inputs: {
					include: ['<allWorkspaceDirs>/**/*.{ts,tsx}', '<allWorkspaceDirs>/tsconfig.json'],
					exclude: ['<allWorkspaceDirs>/dist*/**/*', '<allWorkspaceDirs>/api/**/*'],
				},
				outputs: ['<allWorkspaceDirs>/*.tsbuildinfo', '<allWorkspaceDirs>/.tsbuild/**/*'],
			},
			runsAfter: {
				'maybe-clean-tsbuildinfo': {},
			},
		},
		'pack-tarball': {
			parallel: false,
		},
	},
} satisfies LazyConfig

export default config
