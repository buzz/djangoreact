# Reactail

Reactail is [Wagtail](https://wagtail.io/) married to [React](https://facebook.github.io/react/).

It allows you to benefit from a great CMS while working with modern UI components.

## Configuration

Reactail is configured using [*npm config files*](https://docs.npmjs.com/misc/config). You need to copy `.npmrc.example` to `.npmrc` and set `reactail:secret-key`.

```
$ npm install
$ npm run wagtail:create-virtualenv
$ npm run wagtail:manage migrate
$ npm run wagtail:manage createsuperuser
```

## Running

```
$ npm run dev
```

You should be able to access http://localhost:8000/admin/.
