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
VALUES  ('Harry','Potter',1,NULL),
        ('Hermoine','Granger',5,NULL),
        ('Ron','Weasly',3,1),
        ('Draco','Malfoy',6,1),
        ('Ginny','Weasley',8,1),
        ('Cedric','Diggory',12,1),
        ('Albert','Dumbledore',10,1),
        ('Neville','Longbottom',9,1),
        ('Severus','Snape',15,NULL);
       

       