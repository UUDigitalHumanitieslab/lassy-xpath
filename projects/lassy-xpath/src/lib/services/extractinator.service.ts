import { Injectable } from '@angular/core';
import { Extractinator } from './extractinator';

@Injectable()
export class ExtractinatorService extends Extractinator {
    constructor() {
        super();
    }
}
