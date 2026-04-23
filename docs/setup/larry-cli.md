# Larry CLI

Larry CLI provides an interactive schema-filling Wizard for running generators without wiring MCP into an editor or agent.

## Run CLI with
`npx @codestrap/larry-cli`
 
## Providing API key
On first run you will be asked to generate API key via https://larry-as-a-service.vercel.app website. After going through the process come back into the Wizard and paste your API key. It will be saved in `~/.config/larry/config.json` for future runs so you don't have to save it manually.

Once API key is provided you will see a list of available code generators. Select generator using arrow keys and press enter to start generation Wizard.

## Wizard navigation
### Choosing code directory
First step in Wizard is choosing directory in which code will be generated. Navigate directories with arrow keys and tab. You can filter through directories. You can also type new directory name, it will be created for you. After you've chosen proper directory confirm with Enter.

### Providing generator parameters
After selecting directory Larry CLI Wizard will guide through set of required parameters that you need to provide to generate code with given generator. Some parameters accept string values (ie. component name), some require you to choose one or more options (ie. UI library, set of functionalities you expect to see implemented), some require passing JSON structure (structure of component interface). Use Enter to confirm parameter value. Upon confirmation parameter value will be validated.

### Running generator
After you have provided valid values for all required parameters and pressed Enter on last step code generation will begin. It should not take more than few seconds. All files will be returned at once with their respective paths and descriptions. You can view the result in your terminal or see the generated files on your computer, in directory you provided in the first step of Wizard.

### Advanced navigation
You can hold Shift and use arrow keys to jump between generator parameters. Remember to fill in all required values before running generator. If some required values are missing or are provided in invalid state Wizard will jump back to them before allowing you to run generator.

If you find interactive Wizard tedious press Ctrl-O to open JSON Schema view. You will see exemplary JSON schema for chosen generator and will be asked to provide your own schema in the same format. Press Ctrl-O to get back to interactive Wizard. You can use exemplary schema if you just want to test what code will be created by generator.

## Optional CLI parameters
1. `--output-dir`: instead of using Wizard to select directory for generated files you can pass the path directly via this argument. `npx @codestrap/larry-cli --output-dir ./src/react-components` will skip choosing directory step in Wizard.
2. `--schema-file`: if you have looked at exemplary JSON schema for particular generator and have prepared your own you can save it in file and load using this argument to avoid providing it manually. `npx @codestrap/larry-cli --schema-file component-schema.json` will load the provided file content. After choosing generator you will see "Whole schema" view and will be asked to confirm schema content with Enter key.
