# A basic file browser for s3

## Usage

### Embed in an index.html

Simply embewd the following into your `index.html`

Into the `<head>`

```html
<link href="https://brows3r-js.s3.eu-west-2.amazonaws.com/static/css/main.chunk.css" rel="stylesheet">
```

Into the the `<body>`

```html
<div id="brows3r-root"></div>
<script>
window.BROWS3R = {
  S3_BUCKET: "string",
  S3_BUCKET_REGION: "string",
  S3_BUCKET_URL: "string"
}
</script>
<script src="https://brows3r-js.s3.eu-west-2.amazonaws.com/static/js/bundle.js"></script>
<script src="https://brows3r-js.s3.eu-west-2.amazonaws.com/static/js/2.chunk.js"></script>
<script src="https://brows3r-js.s3.eu-west-2.amazonaws.com/static/js/main.chunk.js"></script>
```

### Self Hosting

At the moment, to host `brows3r`, you'll need to deploy the contents of `./build` to the root of your s3 bucket

i.e.
```sh
$ aws s3 sync ./build s3://<BUCKET_NAME>
