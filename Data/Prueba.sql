-- Crear la tabla generes
CREATE TABLE generes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

-- Crear la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(30),
    username VARCHAR(20),
    passwd VARCHAR(20),
    state BOOLEAN default TRUE
);


-- Crear la tabla books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    numero INTEGER,
    name VARCHAR(50),
    summary VARCHAR(500),
    price FLOAT,
    state BOOLEAN,
    image VARCHAR(500),
    gen_id INTEGER REFERENCES generes(id),
    usr_id INTEGER REFERENCES users(id)
);


CREATE TABLE token (
    code uuid NOT NULL DEFAULT gen_random_uuid(),
    "content" varchar NOT NULL,
    active bool NOT NULL DEFAULT true,
    "timestamp" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    user_code INTEGER NULL,
    CONSTRAINT token_pk PRIMARY KEY (code)
);

-- public."token" foreign keys

ALTER TABLE token ADD CONSTRAINT token_fk FOREIGN KEY (user_code) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;



INSERT INTO generes (name) VALUES
    ('Ficción'),
    ('No ficción'),
    ('Misterio'),
    ('Ciencia ficción');
   
   
   

-- Insertar datos en la tabla books con la misma imagen para todos los libros
INSERT INTO books (numero, name, summary, price, state, image, gen_id, usr_id) VALUES
    (1, 'Libro 1', 'Resumen del libro 1', 19.99, true, 'https://th.bing.com/th/id/R.423055c39be588a1643ea7aeb1ac83be?rik=pT92QfdWkxqHnw&riu=http%3a%2f%2f2.bp.blogspot.com%2f_JXi92wDCOGk%2fTGF1W98DwWI%2fAAAAAAAABqI%2fjmXaiB8h0nE%2fs1600%2fAlice%2bbook%2bcover2.jpg&ehk=VXhL6QjA0lhMfVeSufHlKhmV4xEvzHwDt1S0b4WZ%2bAE%3d&risl=&pid=ImgRaw&r=0', 1, 3),
    (2, 'Libro 2', 'Resumen del libro 2', 24.99, true, 'https://www.toshen.com/images/bks/bks-endoftheocean.jpg', 2, 2),
    (3, 'Libro 3', 'Resumen del libro 3', 29.99, true, 'https://i.pinimg.com/736x/76/6f/3d/766f3d034ffe6a13acfbe9394553c531--novel-cover-design-book-cover-designs.jpg', 3, 3),
    (4, 'Libro 4', 'Resumen del libro 4', 14.99, true, 'https://th.bing.com/th/id/R.423055c39be588a1643ea7aeb1ac83be?rik=pT92QfdWkxqHnw&riu=http%3a%2f%2f2.bp.blogspot.com%2f_JXi92wDCOGk%2fTGF1W98DwWI%2fAAAAAAAABqI%2fjmXaiB8h0nE%2fs1600%2fAlice%2bbook%2bcover2.jpg&ehk=VXhL6QjA0lhMfVeSufHlKhmV4xEvzHwDt1S0b4WZ%2bAE%3d&risl=&pid=ImgRaw&r=0', 1, 2),
    (5, 'Libro 5', 'Resumen del libro 5', 39.99, true, 'https://znanje.hr/product-images/21bb8757-7caa-44cc-9601-a5830640cd64.jpg', 4, 3),
    (6, 'Libro 6', 'Resumen del libro 6', 19.99, true, 'https://i.pinimg.com/736x/76/6f/3d/766f3d034ffe6a13acfbe9394553c531--novel-cover-design-book-cover-designs.jpg', 3, 3);

