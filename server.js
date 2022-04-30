const { response } = require('express');
const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        startApp();
    });
});

const startApp = function() {
  console.log('Welcome to employee tracker!');
  return inquirer.prompt({
      type: 'checkbox',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit'],
  }).then((answer) => {
      console.log(answer);
      if (answer.menu == 'view all departments') {
          console.log('view all departments')
          viewDeparments();
      }
      if (answer.menu == 'view all roles') {
          console.log('view all roles')
          viewRoles();
      }
      if (answer.menu == 'view all employees') {
          console.log('view all employees');
          viewEmployees();
      }
      if (answer.menu == 'add a department') {
          console.log('add a department');
          addDepartment();
      }
      if (answer.menu == 'add a role') {
          console.log('add a role');
          addRole();
      }
      if (answer.menu == 'add an employee') {
          console.log('add an employee');
          addEmployee();
      } 
      if (answer.menu == 'update an employee role'){
          console.log('update an employee role');
          updateEmployee();
      }
  })
};

const viewDeparments = function() {
    const sql = `SELECT * FROM department`;
      db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.table(rows);
      startApp();
    });
};

const viewRoles = function() {
  const sql = `SELECT * FROM role
              LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    startApp();
  });
}

const viewEmployees = function() {
  const sql = `SELECT * FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    startApp()
  });
}

const addDepartment = function() {
  return inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of your new department?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter a name');
            return false;
        }
      }
  }).then((answers) => {
  const sql = `INSERT INTO department (name)
  VALUES (?)`;

  const params = answers.name

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log('New department added!');
    startApp();
  });
})
};

const addRole = function() {
  return inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'What is the name of your new role?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter a name');
            return false;
        }
      }
  },
  {
    type: 'number',
    name: 'salary',
    message: 'What is the salary of this role?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter your role\'s salary');
            return false;
        }
    }
  },
  {
    type: 'number',
    name: 'department',
    message: 'What is the role\'s department id?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter the role\'s department id');
            return false;
        }
    }
  }]).then((answers) => {
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [answers.name, answers.salary, answers.department];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log('New role added!');
      startApp();
    });
})
}

const addEmployee = function() {
  return inquirer.prompt([{
    type: 'input',
    name: 'first',
    message: 'What is the employee\'s first name?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter your employee\'s first name');
            return false;
        }
      }
  },
  {
    type: 'input',
    name: 'last',
    message: 'What is the employee\'s last name?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter your employee\'s last name');
            return false;
        }
    }
  },
  {
    type: 'number',
    name: 'role',
    message: 'What is the employee\'s role id?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter your employee\'s role id');
            return false;
        }
    }
  },
  {
    type: 'number',
    name: 'manager',
    message: 'What is their manager\'s id num?'
  }
]).then((answers) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [answers.first, answers.last, answers.role, answers.manager];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log('New employee added!');
    startApp();
  });
})
}

const updateEmployee = function() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'employee',
      message: 'What is the id of the employee that you wish to update?',
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('Please enter the employee id');
              return false;
          }
      }
    },
    {
    type: 'number',
    name: 'newRole',
    message: 'What is their new role id?',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter the new role id');
            return false;
        }
    }
  }]).then((answers) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [answers.newRole, answers.employee];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'not found'
        });
      } else {
        console.log('Employee updated!');
        startApp();
      }
    });
  })
}