<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li><a href="#todo">Todo</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This web-app is used by manager to assign the tasks for employee.

**Base use case:**

- Signup
- Signin
- Logout
- Refresh token

**Manager use case:**

- CRUD tasks (todos)
- Assign task to employee
- Get summary about all employee
- Get top emplyee
- Get all task of an employee
- Update employee infomation

**Employee use case:**

- Update task status
- Get top employee
- Get all assigned task
- Get self summary
- Update self infomation

### Built With

[![Nest][NestJS]][NestJSUri] [![MongoDB][MongoDB]][MongoDBUri]

<!-- GETTING STARTED -->

## Installation

1. Install NPM packages
   ```sh
   yarn
   ```
2. Create .env file at root contains
   ```sh
    PORT=3333
    AT_SIGN_SECRET='supa-secret'
    RT_SIGN_SECRET='supa-secret2'
    DATABASE_URL='your mongodb database connection to the database'
   ```
3. Open postman and import [this file](coinmap_entry.postman_collection.json) to access API usages

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[NestJS]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[NestJSUri]: https://docs.nestjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDBUri]: https://www.mongodb.com/

## Todo

- Password contraints
- Create client (react web application)
- Integrate CASL and implement PoliciesGuard (remove hardcoded roles)
- Add inteceptor to filter sensitive, unwanted fields in response
- Todos and users pagination
- Implement web-socket protocol to notify employee want assigned a task
