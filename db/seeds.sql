INSERT INTO department (name)
VALUES
('accounting'),
('development'),
('management');

INSERT INTO role (title, salary, department_id)
VALUES 
('accountant', 62000, 1),
('developer', 77000, 2),
('team leader', 125000, 2),
('head of accounting', 108000, 2),
('product owner', 148000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Jeffrey', 'Dahmer', 5, NULL),
('Harold', 'Shipman', 4, 1),
('John', 'Gacy', 1, 2),
('Pedro', 'Lopez', 3, 1),
('Ted', 'Bundy', 2, 4),
('Belle', 'Gunness', 2, 4),
('Ed', 'Gein', 1, 2),
('Edmund', 'Kemper', 2, 4),
('Andrew', 'Cunanan', 2, 4),
('Richard', 'Ramirez', 2, 4);
