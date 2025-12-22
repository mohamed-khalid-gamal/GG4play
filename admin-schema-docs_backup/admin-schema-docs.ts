import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-schema-docs',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-schema-docs.html',
})
export class AdminSchemaDocsComponent { }
