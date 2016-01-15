#FitText(content).js, a plugin for not pissing off your designers.
This adaptation of FitText makes groups of elements resize to the same size.
Use case: You have a bunch of navigation items that fit beautifully within their respective containers in the nav bar. But then you translate the site to another language. And only one doesn't fit. Regular FitText will only change the size of the one that overflows. And then your designers will yell at you for ruining everything. But not with FitText(content)! FitText content will resize all of the items to the size of the one that originally didn't fit. Yay! And no jQuery! And the source is in ES6! And it's React-ready with a handy dismount function!	

##To Use
,,,in ES6
import FitText from './fittext-content';

const headers = document.getElementsByTagName('h1');

const fitElements = new FitText(headers);
,,,

###Alt Syntax
,,,If you're not sure whether any elements exist, it's probably safer to instantiate this way:

[].slice.call(headers).forEach( header => {
	new FitText(header);
});
,,,
This will avoid errors if the headers variable doesn't contain anything.

###For single-page apps
,,,The dismount function should be called when the element is removed from the page

fitElements.dismount();
,,,