[![DOI](https://zenodo.org/badge/129089800.svg)](https://zenodo.org/doi/10.5281/zenodo.10426257)
[![Build Status](https://github.com/UUDigitalHumanitieslab/lassy-xpath/workflows/tests/badge.svg)](https://github.com/UUDigitalHumanitieslab/lassy-xpath/actions)
[![npm version](https://badge.fury.io/js/lassy-xpath.svg)](https://badge.fury.io/js/lassy-xpath)

## LASSY XPath

Module for working with XPath queries on [LASSY XML](https://www.let.rug.nl/vannoord/Lassy/) files. It includes a graphical editor including auto completion, macros and validation based on [Ace](https://ace.c9.io/), a parser and validator based on [ts-xpath](https://github.com/UUDigitalHumanitieslab/ts-xpath) and an "extractinator" for determining XPaths to get each node from the returned tree separately. It also has a "reconstructor" to create an XML structure representing the query tree. The functionality can be used as an Angular module.

It is developed for and used by the [GrETEL search tool](https://gretel.hum.uu.nl/).

## Compatibility

- v0.15.x is for Angular 15
- v0.12.x is for Angular 12
- v0.4.3 and down should work with Angular 6 and JQuery

## Angular

```bash
npm install lassy-xpath
```

Import the module:

```typescript
import { LassyXPathModule } from 'lassy-xpath';

@NgModule({
    imports: [LassyXPathModule]
})
export class AppModule {}
```

Includes the services:

```typescript
import { MacroService, ExtractinatorService, ValueEvent } from 'lassy-xpath';


@Component()
export class ExampleComponent {
    constructor(
        macroService: MacroService,
        private extractinatorService: ExtractinatorService) {
        // set the macros to use in the editor
        macroService.loadDefault();
    }

    inputChanged(event: ValueEvent) {
        this.valid = !event.error;
        this.value = event.xpath;
        console.log(this.extractinatorService.extract(event.xpath));
    }
}
```

Embeds an editor:

```html
<lx-editor [value]="value" (onChange)="inputChanged($event)" autofocus="true"></lx-editor>
```

Use the `ParserService` for parsing/validating a LASSY XML XPath.

## Publishing a new version

*Run `npm run publish` from root or follow these steps:*

1. Compile using `npm run build`
2. `cd dist/lassy-xpath`
3. Optionally run `npm pack` to test the package locally
4. Remove the `lassy-xpath-x.xx.x.tgz` file (if generated in 3)
5. Run `npm publish`
