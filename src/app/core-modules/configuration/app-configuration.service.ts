import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigurationService {
    public appTitle = '';
    public appDescription = '';
    public appRepositoryUrl = '';
    public features = {
        calculatorModule: {
            enabled: true,
            components: {
                kvmax: true,
            },
        },
    };
}
