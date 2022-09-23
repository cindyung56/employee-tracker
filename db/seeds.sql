INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 130000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 75000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Legal Assistant", 100000, 3),
        ("Lawyer", 180000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Brown", 1, null),
        ("Chloe", "Ragnam", 2, 1),
        ("Linda", "Greenberg", 2, 1),
        ("Max", "Wong", 3, null),
        ("Kevin", "Xu", 4, 4),
        ("Van", "Diep", 5, null),
        ("Bob", "Huntington", 6, 6),
        ("Estelle", "Munoz", 6, 6),
        ("Eliza", "Gregson", 6, 6),
        ("Lucia", "Watson", 7, null),
        ("Angela", "Li", 8, 10),
        ("Maggey", "Smith", 8, 10),
        ("Hiro", "Miyama", 9, 10);
