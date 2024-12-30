import { createClient } from '@hey-api/openapi-ts'

createClient({
  client: '@hey-api/client-axios',
  input: 'http://localhost:3000/api-json',
  output: 'src/types/api.types.ts',
})
