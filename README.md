# Client service Development midterm 1 + 2 

# Table of Contents
- [Prologue](#prologue)
- [Requirements](#requirements)
  - [Requirements for midterm 1](#requirements-for-midterm-1)
  - [Requirements for midterm 2](#requirements-for-midterm-2)
- [Tools and packages](#tools-and-packages)
  - [Tools and Ide's](#tools-and-ides)
  - [Packages and Libraries](#packages-and-libraries)
- [Process](#process)
  - [Midterm 1](#midterm-1)
  - [Midterm 2](#midterm-2)
- [Additional content](#additional-content)

## Prologue  
this repo is created to show what ive accomplished in my Uni subject Client Service Deveopment
and as a front end for [Goland api](https://github.com/K0d0ku/web-serv_midterm2/blob/main/%23images_and_files_2/the_process2.md) that i made for my [Web Service Development midterm 2](https://github.com/K0d0ku/web-serv_midterm2)
dont worry i excluded `.gitignore` on purpose to show packages and other sensitive files
Here are the full links for my Golang api project:
- [Github](https://github.com/K0d0ku/web-serv_midterm2)
- [Readme.md](https://github.com/K0d0ku/web-serv_midterm2/blob/main/README.md)
- [The_Process2.md](https://github.com/K0d0ku/web-serv_midterm2/blob/main/%23images_and_files_2/the_process2.md)
and explanation of the project in [Process](#process) preferably [Midterm 2](#midterm-2) (`they are all mandatory to check`)

## Requirements
Since both requirements we not so big of the projects themselves i did it all in 1 big project just separated them by pages and ui
![ReactOriginPage.png](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Images/ReactOriginPage.png)

### Requirements for midterm 1:
The requirements for midterm 1 was not hard we just had to remake the figma dseign 1 to 1 with react components:
[Midterm 1 Requirement 1](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm1/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%E2%84%961.pdf)
![midterm1requirement.png](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm1/midterm1requirement.png)

### Requirements for midterm 2:
The midterm 2 are the ones that are interesting, we had to connect api back end and create a simple front end app 
[Midterm 2 Requirement 1](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm2/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%E2%84%963.pdf)
![module_3_Requirement1.png](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm2/module_3_Requirement1.png)
![module_3_Requirement2.png](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm2/module_3_Requirement2.png)

[Midterm 2 Requirement 2](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm2/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%E2%84%964.pdf)
![module_4_Requirement1.png](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/src/Requirements/midterm2/module_4_Requirement1.png)


## Tools and packages

### Tools and Ide's
- Api - [my own Golang api](https://github.com/K0d0ku/web-serv_midterm2/blob/main/%23images_and_files_2/the_process2.md)
- Ide - Visual Studio Code (optional)
- Endpoint testing - Swagger ui or Postman (optional)

### Packages and Libraries
1. Dependencies

| Package              | Link                                                                                 | Description                                                 |
| -------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **react**            | [https://reactjs.org/](https://reactjs.org/)                                         | Core React library for building user interfaces.            |
| **react-dom**        | [https://reactjs.org/docs/react-dom.html](https://reactjs.org/docs/react-dom.html)   | Renders React components to the DOM.                        |
| **react-router-dom** | [https://reactrouter.com/](https://reactrouter.com/)                                 | Handles client-side routing in React applications.          |
| **jwt-decode**       | [https://www.npmjs.com/package/jwt-decode](https://www.npmjs.com/package/jwt-decode) | Decodes JSON Web Tokens (JWT) for authentication workflows. |

2. Dev Dependencies

| Package                         | Link                                                                                                                             | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **vite**                        | [https://vitejs.dev/](https://vitejs.dev/)                                                                                       | Fast frontend build tool and development server.                           |
| **@vitejs/plugin-react**        | [https://github.com/vitejs/vite/tree/main/packages/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react) | Adds React support (JSX, fast refresh) to Vite.                            |
| **eslint**                      | [https://eslint.org/](https://eslint.org/)                                                                                       | Linter for JavaScript/TypeScript to enforce code quality.                  |
| **@eslint/js**                  | [https://www.npmjs.com/package/@eslint/js](https://www.npmjs.com/package/@eslint/js)                                             | ESLint core rules for JavaScript projects.                                 |
| **eslint-plugin-react-hooks**   | [https://www.npmjs.com/package/eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)               | Linting rules for React hooks usage.                                       |
| **eslint-plugin-react-refresh** | [https://www.npmjs.com/package/eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)           | Integrates ESLint with React Fast Refresh.                                 |
| **@types/react**                | [https://www.npmjs.com/package/@types/react](https://www.npmjs.com/package/@types/react)                                         | TypeScript type definitions for React.                                     |
| **@types/react-dom**            | [https://www.npmjs.com/package/@types/react-dom](https://www.npmjs.com/package/@types/react-dom)                                 | TypeScript type definitions for ReactDOM.                                  |
| **globals**                     | [https://www.npmjs.com/package/globals](https://www.npmjs.com/package/globals)                                                   | Provides global variables for different environments (browser, Node, etc.) |

they can also be seen in [package.json](https://github.com/K0d0ku/client-serv_midterm1-2/blob/main/package.json)
```
{
  "name": "midterm1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "jwt-decode": "^4.0.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }
}
```

## Process
Explain your process here.
### Midterm 1

### Midterm 2

## Additional content
Any extra content goes here.
