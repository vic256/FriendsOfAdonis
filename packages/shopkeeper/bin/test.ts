import { assert } from '@japa/assert'
import { fileSystem } from '@japa/file-system'
import { expectTypeOf } from '@japa/expect-type'
import { processCLIArgs, configure, run } from '@japa/runner'
import { BASE_URL, createApp } from '../tests/app.js'
import { copyFile, mkdir } from 'node:fs/promises'
import { apiClient } from '@japa/api-client'
import { expect } from '@japa/expect'

const { app } = await createApp()

/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCLIArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/
processCLIArgs(process.argv.slice(2))
configure({
  timeout: 30000,
  suites: [
    {
      name: 'configure',
      files: ['tests/configure.spec.ts'],
    },
    {
      name: 'commands',
      files: ['tests/commands/**/*.spec.(js|ts)'],
    },
    {
      name: 'functional',
      files: ['tests/functional/**/*.spec.(js|ts)'],
      configure(suite) {
        return suite
          .setup(async () => {
            const testUtils = await import('@adonisjs/core/services/test_utils').then(
              (m) => m.default
            )
            await mkdir(app.migrationsPath(), { recursive: true })

            await copyFile(
              new URL('../tests/fixtures/migrations/00000_create_users_table.ts', import.meta.url)
                .pathname,
              app.migrationsPath('00000_create_users_table.ts')
            )

            await testUtils.db().migrate()
            return testUtils.httpServer().start()
          })
          .teardown(async () => {
            // await rmdir(app.appRoot, { recursive: true })
          })
      },
    },
  ],
  plugins: [
    assert(),
    expect(),
    fileSystem({ basePath: BASE_URL, autoClean: false }),
    expectTypeOf(),
    apiClient({ baseURL: `http://localhost:${process.env.PORT}` }),
  ],
  teardown: [() => app.terminate()],
})

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
run()
