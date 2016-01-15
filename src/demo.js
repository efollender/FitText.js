import FitText from './fittext-content';

const headers = document.getElementsByTagName('h1');

const fitElements = new FitText(headers);

/****** Alt Syntax
// If you're not sure whether any elements exist, it's probably safer to instantiate this way:

[].slice.call(headers).forEach( header => {
	new FitText(header);
});

This will avoid errors if the headers variable doesn't contain anything.
*********/

/********* For single-page apps
// The dismount function should be called when the element is removed from the page

fitElements.dismount();

**********/