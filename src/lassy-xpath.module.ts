import { NgModule } from '@angular/core';

import { XPathEditorComponent } from './components/_ng';
import { ParserService, MacroService, ExtractinatorService } from './services/_ng';

const declarations = [XPathEditorComponent];
@NgModule({
    declarations,
    exports: declarations,
    providers: [
        ParserService,
        MacroService,
        ExtractinatorService
    ]
})
export class LassyXPathModule {
}
