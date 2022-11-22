DROP DATABASE IF EXISTS usersbackend;

CREATE DATABASE usersbackend;

\c usersbackend;
CREATE TABLE useraccount (
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text  NOT NULL,
    image text,
    password text  NOT NULL
);

CREATE TABLE administer (
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text  NOT NULL,
    image text,
    password text  NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    userId text,
    userName text,
    userImage text,
    comment text
);