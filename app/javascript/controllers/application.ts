import {Application} from '@hotwired/stimulus';

declare global {
    interface Window {
        Stimulus: Application;
    }
}

const application = Application.start();

// Configure Stimulus development experience
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
application.warnings = true;
application.debug = false;
window.Stimulus = application;

export {application};
