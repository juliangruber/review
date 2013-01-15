# review

Uses phantomjs to get screenshots of your running sites in different resolutions.

<img src="http://f.cl.ly/items/0z2H263Q302m1b2C452C/Screen%20Shot%202013-01-14%20at%2011.38.55%20PM.png" width="280">
<img src="http://f.cl.ly/items/3T2k0x0N0M0T3y1j2Y1c/Screen%20Shot%202013-01-14%20at%2011.38.41%20PM.png" width="550">

## Usage

```bash
$ npm install -g review

$ review --sites='{"google":"http://google.com","facebook":"http://facebook.com"}' \
$ open http://localhost:3000/

$ # and check
$ review --usage
Host review
Usage: review [options]

Example: review --sites='{"google":"http://google.com"}'

Options:
  --port, -p         Port to listen on                                         [default: 4000]
  --title, -t        Title of the review                                       [default: "Review"]
  --sites, -s        Sites as JSON Object of strings                         
  --resolutions, -r  Resolutions as JSON Array of strings                      [default: "[\"1200x800\"]"]
  --wait, -w         Time to give the page to finish loading, in milliseconds  [default: 10000]
  --help, -h         Print usage instructions                                

```

or

```js
var review = require('review')

review()
  .title('My Review')
  .sites({ google : 'http://google.com/' })
  .resolutions(['1280x1024', '1900x1600', '800x600'])
  .wait(1000)
  .listen(3000)
```

## API

### review()

Returns an http / express request handler.

### review#title(title)

Display `title` in the review. Defaults to `Review`.

### review#sites(sites | fn)

Either pass an object with titles as keys and urls as values, or a `Function` that fetches the sites to be displayed. This way, on every page load that list is refreshed and you can e.g. display all sites present in your sitemap.

```js
review.sites(function (cb) {
  request('http://my.si/temap', function (err, res) {
    if (err) return cb(err)
    cb(null, format(res))
  })
})
```

### review#resolutions(["WxH", "WxH", ...])

Configure the resolutions to use for screenshots. Defaults to `["1200x800"]`

### review#wait(x)

PhantomJS will wait for `x` milliseconds after loading the page before it takes the screenshot, so you can make sure your page is completely loaded.

### review#listen(port)

Start the review server on port `port`.

## Installation

You need to have phantomjs installed, get it via

```bash
$ brew install phantomjs
```

or check [phantomjs.org](http://phantomjs.org/)

Then

```bash
$ npm install -g review # for cli
$ npm install review    # for library
```

## License

(MIT)

Copyright (c) 2012 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
