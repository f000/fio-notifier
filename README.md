# Fio Notifier

This script fetches latest transactions on your Fio banka account, through Fio API, and displays them in Notification Center for Mac, notify-osd/libnotify-bin for Linux, Toasters for Windows 8/10, or taskbar Balloons for earlier Windows versions. If none of these requirements are met, Growl is used.

Supports multiple accounts and currencies.

## Requirements
- **Node.js**: > 5.4.0
- **Mac OS X**: >= 10.8 (tested)
- **Linux**: `notify-osd` or `libnotify-bin` installed (Ubuntu should have this by default)
- **Windows**: >= 8, task bar balloon if earlier or Growl if that is installed.
- **General Fallback**: Growl

## Installation

1. Run `npm install`

2. Generate and add your Fio API key(s) to the `config.json` file.

3. Install the cron command:

        * * * * *   ~/<your path>/fio-notifier/run-node.sh >> ~/<your path>/fio-notifier/fio-notifier.log 2 >> ~/<your path>/fio-notifier/fio-notifier.error.log

    If you are using a Node Version Manager, replace `run-node.sh` for `run-nvm.sh`.

4. Enjoy!

## Development

- [Fio API docs](https://www.fio.cz/docs/cz/API_Bankovnictvi.pdf)

- Reset API pointer

        https://www.fio.cz/ib_api/rest/set-last-id/<token>/<transaction-id>/

## License

Fio Notifier is freely distributable under the terms of the [MIT license](https://github.com/f000/fio-notifier/blob/master/LICENSE).

[![MIT LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/f000/fio-notifier/blob/master/LICENSE)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
