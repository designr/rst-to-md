# rst to md

**`rst-to-md` is a bunch of scripts that help you convert rst files to md.**

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

NOTE: This must be full of bugs in real world scenarios different from mine. For one, it has only been tested with a flat list of files inside `input_dir`; no nesting. If you use this and find it helpful, and want to contribute a [bug report or feature request](https://github.com/designr/rst-to-md/issues), or [a PR](https://github.com/designr/rst-to-md/pulls), feel free to do so.

---

## Want to waste some time? Read on...

Most of the heavy lifting of the transformation from `rst` to `md` is
handled by pandoc; so you need to have pandoc installed on your system
and on your system PATH.

This is just a wrapper script around `pandoc`.

## specific need

**Why this when we have tools like `pandoc` and https://cloudconvert.com/rst-to-md ?**

  `pandoc` it is; and it does a wonderful job of converting rst files to md.

  I needed to convert my Nikola blog data to be ported to a `md` based static
  site generator `hugo`, and `pandoc` would indiscriminately strip all the metadata
  from my posts. Thus this tool to preserve and properly convert the medadata as frontmatter
  for the md files.

  That's all these scripts do - convert the front-matter directives in `rst` files to
  `yaml` front-matter for the `md` files and append the `pandoc` output to it to create
  the new md files to be fed into another SSG.

  I needed this specifically to port a blog from `Nikola` to `Hugo`.

## Usage

This project uses `pnpm` for its speed and efficiency, but also works with `npm`.
Use either of the one throughout, do not switch in between.

To run the JS version of the script:

```
$ pnpm run convert test-data/rst output
# `pnpm convert` also works
# because pnpm converts all scripts to commands
# by default
```
or
```
$ npm run convert test-data/rst output
```
If unclear, just run `pnpm convert` or `npm run convert` or `pnpm bash_convert` to see usage help.

To run the bash script, do one of:
```
bash ./convert-to-md test-data/rst output

# or it could be
# bash ./convert-to-md test-data/rst test-data/md
# where `md` will be created and all output md files
# will be dumped there.
```
or
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

**I started with npm, but want to try out pnpm (or vice-versa). What do?**

Just start over. Just remove the `node_modules/` directory and the lock file (`package-lock.json` | `pnpm-lock.yaml`) created by your
package manager (`npm` | `pnpm`); and use the tool you like.

## I need another feature...

  Please feel free to post an issue or fork and use it however you see fit. Would be great
  if you're adding tested features and could open a pull request.
  I'll try my best to review and merge asap.

## What's all the fuss with all those options?

Nothing. I am just having fun.

## license

  [MIT](./LICENSE)
