# PollApplication-Frontend

### Structure

```
PollApp
├── public
├── src
│   ├── components
│   │   └── ...shared
│   ├── pages
│   │   ├── AccountPage.js
│   │   ├── ...
│   │   └── AdminPage
│   │       ├── components...
│   │       └── index.js
│   ├── routes
│   │   └── routes.js
│   ├── tests
│   │   ├── Components
│   │   └── Pages
│   │       └── ...
│   ├── theme
│   │   └── theme.js
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── .gitignore
├── LICENSE
├── package.json
├── yarn.lock
└── README.md
```

### Proposed tools

- [Material-ui](https://material-ui.com/) components
- `makeStyles` from `material-ui`. Easy to write css in component. [More advantages](https://material-ui.com/styles/basics/)
- Data fetcher: [useSWR](https://swr.vercel.app/), saves data in cache, Hence, there is probably no need for a store like redux.
- Form Managment: [React Hook Forms](https://react-hook-form.com/). Less state to mangae and easy to use validation.

### Code format

- [Prettier](https://github.com/prettier/prettier-vscode)
