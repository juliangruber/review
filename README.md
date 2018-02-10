# review

_Get screenshots of all your running sites in different resolutions!_

Updating large and possibly responsively designed sites can be a hassle. You
never know whether your change breakes anything on the other end of your
sitemap, or in a certain resolution, except if have a look at every individual
page...in every resolution you care about.

The idea of `review` is not to test everything (and visual testing is hard) but
rather use the human mind's excellent ability to quickly scan information and
filter out what you need, i.e. what is broken.

![preview](http://f.cl.ly/items/3O1w3Y0X2i0s1F1M273x/Screen%20Shot%202013-01-24%20at%2012.50.38%20PM.png)

This screenshot is from
[review-host](https://github.com/juliangruber/review-host), which hosts multiple
reviews in one server.

## Usage

```bash
$ npm install -g review

$ review --sites='{"google":"http://google.com","facebook":"http://facebook.com"}' \
  --resolutions='["1280x1024", "1900x1600", "800x600"]'
$ open http://localhost:4000/

$ # and check
$ review --usage
Host review
Usage: review [options]

Examples: review --sites='{"google":"http://google.com"}' --cache=100

Options:
  --port, -p         Port to listen on                                         [default: 4000]
  --title, -t        Title of the review                                       [default: "Review"]
  --sites, -s        Sites as JSON Object of strings                           [required]
  --resolutions, -r  Resolutions as JSON Array of strings                      [default: "[\"1200x800\"]"]
  --wait, -w         Time to give the page to finish loading, in milliseconds  [default: 0]
  --cache, -c        Cache snapshots for x milliseconds                        [default: false]
  --cookie           Add a cookie to PhatomJS
  --cut              Cut snapshots to exact screen size                        [default: false]
  --help, -h         Print usage instructions

```

or create a review programmatically:

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
    name : 'cookie monster',
    value : 'i eat them!',
    domain : 'google.com'
  })
  .listen(4000)
```

---

For Windows users: Windows doesn't like single quote marks (thanks [@jdarling](https://github.com/jdarling) for pointing this out) so you can only use double quotes:

```bash
review --sites="{\"google\":\"http://google.com\",\"facebook\":\"http://facebook.com\"}" --resolutions="[\"1280x1024\", \"1900x1600\", \"800x600\"]"
```

## API

### review()

Returns an http / express request handler.

### review#title(title)

Display `title` in the review. Defaults to `Review`.

### review#sites(sites | fn)

Either pass an object with titles as keys and urls as values, or a `Function`
that fetches the sites to be displayed. This way, on every page load that list
is refreshed and you can e.g. display all sites present in your sitemap.

```js
review.sites(function (cb) {
  request('http://my.si/temap', function (err, res) {
    if (err) return cb(err)
    cb(null, format(res))
  })
})
```

See [example/sites](https://github.com/juliangruber/review/blob/master/example/sites/sites.js)

### review#resolutions(["WxH", "WxH", ...])

Configure the resolutions to use for screenshots. Defaults to `["1200x800"]`

### review#wait(x)

PhantomJS will wait for `x` milliseconds after loading the page before it takes
the screenshot, so you can make sure your page is completely loaded.
Defaults to `0`.

### review#cache({ dir : 'directory', expires : 60 })

Cache rendered snapshots for `expires` seconds in `dir`.

### review#cookie(cookie)

Add a cookie for PhantomJS to use. Can be called multiple times, to set multiple cookies.

The cookie format is:

```js
{
  name : 'valid-cookie-name',             // required
  value : 'valid-cookie-value',           // required
  domain : 'the-domain.com',              // required
  path : '/',
  httponly : true,
  secure : false,
  expires : (new Date()).getTime() + 3600 // expires in 1 hour
}
```

### review#cut(bool)

If `bool` is `true` then screenshots will be cut to the exact dimensions that
you specified. Without this pages can be longer than your specified height.

### review#listen(port)

Start the review server on port `port`.

## Installation

There is no need to have phantomjs installed, it will be fetched together with `review`.

```bash
$ npm install -g review # for cli
$ npm install review    # for library
```

## Contibutors

* [juliangruber](https://github.com/juliangruber)
* [jothirams](https://github.com/jothirams)
* [jzelenkov](https://github.com/jzelenkov)

## Sponsors

This module is proudly supported by my [Sponsors](https://github.com/juliangruber/sponsors)!

Do you want to support modules like this to improve their quality, stability and weigh in on new features? Then please consider donating to my [Patreon](https://www.patreon.com/juliangruber). Not sure how much of my modules you're using? Try [feross/thanks](https://github.com/feross/thanks)!

## License

(MIT)

Copyright (c) 2012 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
