DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;
\c blog;

CREATE TABLE blog_user(
    id                  serial PRIMARY KEY,
    name                varchar(30) NOT NULL,
    email               varchar(50) NOT NULL UNIQUE,
    password            char(30)
);

CREATE TABLE post(
    id                  serial PRIMARY KEY,
    title               varchar(50) NOT NULL,
    text                text NOT NULL,
    date_time           timestamp DEFAULT CURRENT_TIMESTAMP,
    is_sharable         boolean DEFAULT false
);

CREATE TABLE author(
    id                  serial PRIMARY KEY
) inherits (blog_user);

CREATE TABLE author_posts(
    id                  serial PRIMARY KEY,
    author_id           integer  NOT NULL,
    post_id             integer  NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author (id),
    FOREIGN KEY (post_id) REFERENCES post (id)
);

CREATE TABLE reader(
    id                  serial PRIMARY KEY
) inherits (blog_user);

CREATE TABLE address(
    id                  serial PRIMARY KEY,
    district            varchar(50) NOT NULL,
    street              varchar(50) NOT NULL,
    number              integer NOT NULL,
    complement          varchar(30),
    zip_code            varchar(11) NOT NULL,
    reader_id           integer  NOT NULL,
    FOREIGN KEY (reader_id) REFERENCES reader (id)
);
