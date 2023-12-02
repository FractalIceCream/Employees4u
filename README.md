# Employees4u
  [![license-shield]][license-url]

## Description

This application is a simple CMS app to manage a company's employees. It's a command-line only application, using inquirer to prompt the user options and actions to navigate the database. Options include viewing departments/roles/employees, adding departments/roles/employees, updating an existing employee's role/manager, and deleting an entry a table. 
```
Viewing information returns a table within the command-line:

-Viewing departments will show department id and department name
-Viewing roles will show job title, role id, department of the role, and salary of role
-Viewing employees will show employee id, first name, last name, job titles, departments, salary, and manager of the employee

Add and Update option will prompt info required in order to add to the database:

-Adding an entry needs to be unique otherwise adding will fail and cancel transaction
-Adding department will require department name
-Adding role will require role name, role salary, and selected department role will belong to
-Adding employee will require first name, last name, selected role, selected manager
-Updating an selected employee's role will require the chosen role from the list
-Updating an selected employee's manager will require chosen manager from the list

Deleting entries from tables will prompt info and selections in order to delete the entry from the database:

-Deleting an entry require
    -selecting from a list of tables (employees, roles, departments)
    -selecting one from the list in the table
```
## Table of Contents
  
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
  
npm i mysql2 and inquirer@8.2.4

<p align="right"><a href='#employees4u'>back to top</a></p>
  
## Usage

[link video demo here](https://drive.google.com/file/d/1cDc_HQoZx_BdTBqBTjIKgAi_6QQjJxv2/view)
  
<p align="right"><a href='#employees4u'>back to top</a></p>

## License
  
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit)

<p align="right"><a href='#employees4u'>back to top</a></p>

## How to Contribute
  
Contribute as needed by forking the repo and making a pull request.
  
<p align="right"><a href='#employees4u'>back to top</a></p>

## Questions

[FractalIceCream's GitHub](https://github.com/FractalIceCream)

If you have any questions or feedback, reach me @ [vroco86@gmail.com](mailto:vroco86@gmail.com).

<p align="right"><a href='#employees4u'>back to top</a></p>

[license-shield]: https://img.shields.io/badge/LICENSE-MIT-green
[license-url]: https://choosealicense.com/licenses/mit
