INSERT INTO department (dep_name)
VALUES  ('Engineering'),
        ('Accounting'),
        ('Legal'),
        ('Sales'),
        ('Service');

INSERT INTO roles (title, salary, department_id)
VALUES  ('CEO',10000000,1),
        ('Manager',100000,2),
        ('Auditor',70000,3),
        ('Accountant',60000,3),
        ('Lawyer',90000,2),
        ('Sales Rep',50000,4),
        ('Customer Service',40000,4),
        ('Engineer',120000,3);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  ('Harry','Potter',1,1),
        ('Hermoine','Granger',5,3),
        ('Ron','Weasly',3,2),
        ('Draco','Malfoy',6,8),
        ('Ginny','Weasley',8,0),
        ('Cedric','Diggory',12,0),
        ('Albert','Dumbledore',10,4),
        ('Neville','Longbottom',9,0),
        ('Severus','Snape',15,0);
