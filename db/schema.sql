DROP DATABASE IF EXISTS usersbackend;

CREATE DATABASE usersbackend;

\c usersbackend;
CREATE TABLE useraccount (
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text  NOT NULL UNIQUE,
    image text,
    password text  NOT NULL
);

CREATE TABLE administer (
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text  NOT NULL UNIQUE,
    image text,
    password text  NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    username text,
    userimage text,
    comment text,
    memberid text,
    date text
);