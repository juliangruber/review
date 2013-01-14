# review

Uses phantomjs to get screenshots of your running sites in different resolutions.

<img src="http://f.cl.ly/items/0z2H263Q302m1b2C452C/Screen%20Shot%202013-01-14%20at%2011.38.55%20PM.png" width="280">
<img src="http://f.cl.ly/items/3T2k0x0N0M0T3y1j2Y1c/Screen%20Shot%202013-01-14%20at%2011.38.41%20PM.png" width="550">

## usage

```bash
$ npm install -g review
$ review --sites='{"google":"http://google.com","facebook":"http://facebook.com"}' --resolutions='["1440x900","1280x1024"]' --port 3000
$ open http://localhost:3000/
$ # or check
$ review --usage
```

And as library:

```bash
$ npm install review
```

```js
var review = require('review')

var sites = {
  'google' : 'http://google.com',
  'facebook' : 'http://facebook.com',
  'github' : 'https://github.com'
}

var resolutions = [
  '1280x1024', '1900x1600', '800x600'
]

review()
  .title('My Review')
  .sites(sites)
  .resolutions(resolutions)
  .listen(3000)

// review returns an express request handler
```

## requirements

You need to have phantomjs installed, get it via

```bash
$ brew install phantomjs
```

or check [phantomjs.org](http://phantomjs.org/)

## license

(MIT)

Copyright (c) 2012 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
