console.log(`
  Hi there!

  This is a script to convert a flat (non-nested) list of rst files to md files.

  To use, place all your rst files in a directory, say, 'input/'.
  Then, run one of the following:

    Usage:
      pnpm convert input output
        # to run the conversion on a flat list of rst files
      pnpm bash_convert input output
        # to run the conversion with bash script

  This will create the converted md files inside a directory 'output/'

  To use some test data provided here, you may try the command with following params:

      pnpm convert test-data/rst output
`)
