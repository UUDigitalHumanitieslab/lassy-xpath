[![Build Status](https://travis-ci.org/UUDigitalHumanitieslab/lassy-xpath.svg?branch=develop)](https://travis-ci.org/UUDigitalHumanitieslab/lassy-xpath)

## LASSY XPath

Module for working with XPath queries on [LASSY XML](https://www.let.rug.nl/vannoord/Lassy/) files. It includes a graphical editor including auto completion, macros and validation based on [Ace](https://ace.c9.io/), a parser and validator based on [ts-xpath](https://github.com/UUDigitalHumanitieslab/ts-xpath) and an "extractinator" for determining XPaths to get each node from the returned tree separately. It also has a "reconstructor" to create an XML structure representing the query tree. The functionality can be used as an Angular module, using JQuery or as plain JavaScript.

## Angular 2+

(Only tested in Angular 6)

Import the module:

```typescript
import { LassyXPathModule } from 'lassy-xpath/ng';

@NgModule({
    imports: [LassyXPathModule]
})
export class AppModule {}
```

Includes the services:

```typescript
import { MacroService, ExtractinatorService, ValueEvent } from 'lassy-xpath/ng';


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

## JQuery

Make sure the following scss is included:

```scss
@import 'lassy-xpath/scss/xpath-editor';
```

Extend JQuery by importing `lassy-xpath/jquery`.

```typescript
import 'lassy-xpath/jquery';

let $xpathEditor = $('.xpath-editor');
$xpathEditor.xpathEditor({
    macrosUrl: $xpathEditor.data('macros-url')
});

let $xpathVariables = $('.xpath-variables');
$xpathVariables.xpathVariables({
    formName: $xpathVariables.data('name'),
    source: $xpathVariables.data('source'),
});
```
