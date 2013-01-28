# review

_Get screenshots of all your running sites in different resolutions!_

Updating large and possibly responsively designed sites can be a hassle. You never know whether your change breakes
anything on the other end of your sitemap, or in a certain resolution, except if have a look at every individual
page...in every resolution you care about.

The idea of `review` is not to test everything (and visual testing is hard) but rather use the human mind's excellent
ability to quickly scan information and filter out what you need, i.e. what is broken.

![preview](http://f.cl.ly/items/433L3B2a42140B2c2r2M/screen.png)

If you want to review many sites at once, like microsoft and bootstrap instead of only multiple pages of the microsoft
website, check out [review-host](https://github.com/juliangruber/review-host).

## Usage

```bash
$ npm install -g review

$ review --sites='{"google":"http://google.com","facebook":"http://facebook.com"}'
$ open http://localhost:4000/

$ # and check
$ review --usage
Host review
Usage: review [options]

Example: review --sites='{"google":"http://google.com"}' --cookie='{"name":"SID","value":"s%3AOjB","domain":"google.com"}' --wait 5000 --resolutions='["1920x1280","1200x800"]'

Options:
  --port, -p         Port to listen on                                         [default: 4000]
  --title, -t        Title of the review                                       [default: "Review"]
  --sites, -s        Sites as JSON Object of strings                           [required]
  --resolutions, -r  Resolutions as JSON Array of strings                      [default: "[\"1200x800\"]"]
  --wait, -w         Time to give the page to finish loading, in milliseconds  [default: 0]
  --cache, -c        Cache snapshots for x seconds                             [default: false]
  --cut              Cut snapshots to exact screen size                        [default: false]
  --cookie           Cookie object, if your site needs it                      [default: null]
  --help, -h         Print usage instructions

```

or

```js
var review = require('review')

review()
  .title('My Review')
  .sites({ google : 'http://google.com/' })
  .resolutions(['1280x1024', '1900x1600', '800x600'])
  .cache({
    dir : __dirname + '/cache/',
    expires : 60
  })
  .cookie({
    'name':     'connect.sid',   /* required property */
    'value':    's%3A4eZ6a00e1jot1EF6HhqqmBCC.RgLmbqI8BQblhHTuUSIfX3ejWexW1x7rGEGcVOgMY%2BU',  /* required property */
    'domain':   'localhost',           /* required property */
    'path':     '/',
    'httponly': true,
    'secure':   false
    })
  .listen(4000)
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

See [example/sites.js](https://github.com/juliangruber/review/blob/master/example/sites.js)

### review#resolutions(["WxH", "WxH", ...])

Configure the resolutions to use for screenshots. Defaults to `["1200x800"]`

### review#wait(x)

PhantomJS will wait for `x` milliseconds after loading the page before it takes the screenshot, so you can make sure your page is completely loaded. Defaults to `0`.

### review#cache({ dir : 'directory', expires : 60 })

Cache rendered snapshots for `expires` seconds in `dir`.

### review#cut(bool)

If `bool` is `true` then screenshots will be cut to the exact dimensions that you specified. Without this pages can be longer than your specified height.

### review#cookie({'name':     'Valid-Cookie-Name',   /* required property */
                   'value':    'Valid-Cookie-Value',  /* required property */
                   'domain':   'localhost',           /* required property */
                   'path':     '/foo',
                   'httponly': true,
                   'secure':   false)

Configure the cookie that has to be passed, if your site needs it.

### review#listen(port)

Start the review server on port `port`.

## Installation

You need to have phantomjs 1.7 or above installed, get it via

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
