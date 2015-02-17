# locationHash.js

A tiny script to manage easely the `window.location.hash` directly with the `href` of your links.

```html
<!-- location.hash -> "" -->

<a href="##add(plop)">Plop</a> <!-- *click* -->
<!-- location.hash -> "#plop" -->

<a href="##sub(plop)">Plop</a> <!-- *click* -->
<!-- location.hash -> "" -->

<a href="##add(plop)">Plop</a> <!-- *click* -->
<!-- location.hash -> "#plop" -->

<a href="##add(plop, 21)">Plop</a> <!-- *click* -->
<!-- location.hash -> "#plop=21" -->

<a href="##add(foo)">Foo</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo" -->

<a href="##add(foo, bar)">Foo</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo=bar" -->

<a href="##toggle(rub, about)">About</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo=bar&rub=about" -->

<a href="##toggle(rub, about)">About</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo=bar" -->

<a href="##toggle(rub, about)">About</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo=bar&rub=about" -->

<a href="##toggle(rub, contact)">About</a> <!-- *click* -->
<!-- location.hash -> "#plop=21&foo=bar&rub=contact" -->

<a href="##toggle(rub, contact), sub(plop), add(foo, test)">About</a> <!-- *click* -->
<!-- location.hash -> "#foo=test" -->

```
