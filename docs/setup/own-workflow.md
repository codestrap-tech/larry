# Direct Package Usage
You can use Larry SDK package directly in your JavaScript code to include our generators in your custom development process.

## Installation
`npm install @codestrap/larry-sdk`

## API Key
Obtain your API Key at https://larry-as-a-service.vercel.app

Put the API Key under LARRY_API_KEY=<api-key> variable in `.env` file in your project directory.

## Usage
We're assuming `{"type": "module"}` in your package.json.

Create `larry.js` file in your project. Import Larry SDK and create SDK instance:
```typescript
import { LarrySDK } from "@codestrap/larry-sdk";

const sdk = new LarrySDK();
```

Run the file with `node --env-file=.env larry.js`

### Listing available generators
`getGenerators` is a sync method returning array of available generators. Iterate over the array to see all the generators or filter using generator `name` to find the one that you want to use.
```typescript
const generators = sdk.getGenerators();

generators.forEach(generator => console.log(generator));

generators.find(({ name }) => name === 'tanstack_table_generator');
```

### Generators schema
Each generator has `schema` property that you can use to see what fields are needed to run the generator.
```typescript
const tableGenerator = generators.find(({ name }) => name === 'tanstack_table_generator');
console.log(tableGenerator.schema);
```

Each generator has `exampleSchema` property that you can use to see what how exemplary schema looks. You can use it to inspect the schema and to run generator with exemplary data.
```typescript
const tableGenerator = generators.find(({ name }) => name === 'tanstack_table_generator');
console.log(tableGenerator.exampleSchema);

sdk.generateCode(
  tableGenerator.id,
  tableGenerator.exampleSchema,
  './'
);
```

Each generator has `zodSchema` property that you can use to parse your schema before using it to generate code. Parsing with `zodSchema` will give you confidence that your schema contains all required fields and all fields have proper format. For `zodSchema` exact API refer [Zod v3 library documentation](https://v3.zod.dev).

```typescript
const customSchema = {
  name: 'UsersTable',
  rowModelName: 'UserRow',
  ...
}

const tableGenerator = generators.find(({ name }) => name === 'tanstack_table_generator');
const parsedSchema = tableGenerator.zodSchema.parse(customSchema);

sdk.generateCode(
  tableGenerator.id,
  parsedSchema,
  './'
);
```

### Generating code
Once you have obtained Generator ID from list of generators and prepared your schema you are ready to generate code. `generateCode` function is async, as it connects with our server to generate the code. We do not store any data you send us. `generateCode(generatorID, generatorSchema, outputDirectory)` function accepts three argument, all of them are required.

After you have succesfully run `generateCode` all files will be saved to `outputDirectory` you provided. You can also inspect results of code generation directly in code. 
`generateCode` returns `Promise<Array<{ file: string; code: string; summary: string; }>>`

```typescript
const customSchema = {
  name: 'UsersTable',
  rowModelName: 'UserRow',
  ...
}

const generators = sdk.getGenerators();
const tableGenerator = generators.find(({ name }) => name === 'tanstack_table_generator');
const parsedSchema = tableGenerator.zodSchema.parse(customSchema);

const generatedFiles = await sdk.generateCode(
  generator.id, 
  parsedSchema, 
  './'
);
```
