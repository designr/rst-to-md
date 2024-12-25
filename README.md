# rst to md

**`rst-to-md` is a bunch of scripts that help me convert my Nikola blog data (rst files) to Hugo blog data (md files) along with the metadata in frontmatter.**

## TL;DR

install `pandoc`; have it on `PATH`. Then run:

```
# the bash script

bash ./convert-to-md input_dir output_dir
```
OR
```
# the JS script

pnpm install &&
pnpm convert input_dir output_dir
```
where `input_dir` should contain your `rst` files and `output_dir` will contain newly created `md` files.

It currently only works for a flat list of files because that's all we needed.

NOTE: This is probably full of bugs in real world scenarios different from mine.

If you use this and find it helpful, and want to request or add features/improvements: you're welcome to open a [bug report or feature request](https://github.com/designr/rst-to-md/issues), or [a PR](https://github.com/designr/rst-to-md/pulls).

---

## depends on `pandoc`

The  `rst` to `md` conversion is handled by `pandoc`; but pandoc does not translate the frontmatter,
in fact it just drops all the frontmatter in my rst files during this conversion. Hence this script.

To use either of bash script or the JS script in this project,
you need to have pandoc installed on your system, and on your system PATH.

## Tools you can directly use to convert your `rst` files to `md`

- `pandoc`
- https://cloudconvert.com/rst-to-md

  However, these would indiscriminately strip all the metadata such as front-matter
  directives, for example in rst files used for a Nikola blog.

  Thus this tool to preserve and properly convert the medadata as frontmatter
  for the md files. You may need to modify the scripts to your specific needs.

  That's all these scripts do - convert the front-matter directives in `rst` files to
  `yaml` front-matter for the `md` files and append the `pandoc` output to it to create
  the new md files.

  I needed this specifically to move my blog - `Nikola` -> `Hugo`.

## Usage

This project uses `pnpm`, but also works with `npm`.

Since this was a trial to see what works best, there is a JS script, and a bash script -
both perform the same operation. Considering you'd most likely need to modify them in
some way, pick what's most convenient for you.

### JS script

```
$ pnpm run convert test-data/rst output
# `pnpm convert` also works
```

or, if you're using npm:

```
$ npm run convert test-data/rst output
```

### bash script

```
bash ./convert-to-md test-data/rst output

# the name 'output' is arbitrary; you may use any valid dir name/path here.
```

or, it can also be invoked from the package.json `script` commands
for your chosen package manager like so:

```
$ pnpm bash_convert test-data/rst output
```
or

```
$ npm run bash_convert test-data/rst output
```

This will exit with error if source dir `test-data/rst` is not present.
This will output `md` files in `output/` if it exists; or create `output/`
if it doesn't already exist,

## Possible improvements

- Allow adding metadata_keys of interest via external text file with list of words, one per line
- Add a better, less coupled, system for key transformations as in category->categories in this case
- [Your improvement suggestion here](https://github.com/designr/rst-to-md/issues/new)...

## license

  [MIT](./LICENSE)
