# locationHash.js

A tiny script to manage easely the `window.location.hash` directly with the `href` of your links.  
This script allows you to `watch` the change of any variable in the `hash`.

There are some interactive tests here: http://mr21.github.io/locationHash.js/

```html
<!-- links                                    | location.hash     -->
<!-- - - - - - - - - - - - - - - - - - - - - -| - - - - - - - - - -->
<a href="##add(a)"></a>                      <!-- #/a             -->
<a href="##sub(a)"></a>                      <!-- #/              -->
<a href="##add(a)"></a>                      <!-- #/a             -->
<a href="##add(a,1)"></a>                    <!-- #/a=1           -->
<a href="##add(b)"></a>                      <!-- #/a=1&b         -->
<a href="##add(b,2)"></a>                    <!-- #/a=1&b=2       -->
<a href="##toggle(c,3)"></a>                 <!-- #/a=1&b=2&c=3   -->
<a href="##toggle(c,3)"></a>                 <!-- #/a=1&b=2       -->
<a href="##toggle(c,3)"></a>                 <!-- #/a=1&b=2&c=3   -->
<a href="##toggle(c,4)"></a>                 <!-- #/a=1&b=2&c=4   -->
<a href="##toggle(c,4),sub(a),add(d,5)"></a> <!-- #/d=5           -->
```
