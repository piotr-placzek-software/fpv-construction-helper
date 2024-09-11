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
                rpm: true,
                acceleration: true,
                pts: true,
                pts_c: true,
                p2w: true,
            },
        },
    };
}
