import { PathVariable, Extractinator, FormatError } from '../../services/extractinator';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs'
import { debounceTime, map, filter } from 'rxjs/operators';
import { XPathModels } from 'ts-xpath';

export class XPathVariablesRenderer {
    private view: View;
    private source: JQuery;
    private extractinator: Extractinator;

    private subject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private variables = this.subject.pipe(
        debounceTime(50),
        map(xpath => this.extract(xpath)),
        filter(variables => variables != null));

    constructor(element: HTMLElement, source: string | JQuery, formName: string) {
        let $element = $(element);
        this.source = $(source);

        this.view = new View(formName, $element);

        this.variables.subscribe(variables => {
            this.view.render(variables);
        });

        // make sure any initial value is rendered
        this.update();
        this.source.on('change keyup', evt => this.update());

        this.extractinator = new Extractinator();
    }

    private update() {
        this.subject.next(this.source.val() as string);
    }

    private extract(xpath: string) {
        try {
            return this.extractinator.extract(xpath);
        }
        catch (error) {
            if (!(error instanceof XPathModels.ParseError || error instanceof FormatError)) {
                throw error;
            }
        }

        return null;
    }
}

let xpathVariables: CreateXPathVariablesRenderer = function (options) {
    return this.each(function () {
        let target = this;
        $(this).data('xpath-editor', new XPathVariablesRenderer(target, options.source, options.formName));
    });
}

$.fn.extend({ xpathVariables });
export type CreateXPathVariablesRenderer = (options: { source: string | JQuery, formName: string }) => JQuery;
declare global {
    interface JQuery {
        xpathVariables: CreateXPathVariablesRenderer
    }
}


class View {
    private renderedLength = 0;
    private names: JQuery[] = [];
    private paths: JQuery[] = [];

    private renderItem = (index: number) => {
        let nameInput = $(`<input type="hidden" name="${this.formName}[${index}][name]" />`);
        let pathInput = $(`<input type="hidden" name="${this.formName}[${index}][path]" />`);

        this.target.append(nameInput);
        this.target.append(pathInput);

        this.names.push(nameInput);
        this.paths.push(pathInput);
    }

    constructor(private formName: string, private target: JQuery) {
    }

    public render(items: PathVariable[] | null) {
        if (!items) {
            return;
        }

        if (this.renderedLength != items.length) {
            this.target.empty();
            this.names = [];
            this.paths = [];

            for (let i = 0; i < items.length; i++) {
                this.renderItem(i);
            }
        }

        for (let i = 0; i < items.length; i++) {
            this.names[i].val(items[i].name)
            this.paths[i].val(items[i].path)
        }
    }
}
