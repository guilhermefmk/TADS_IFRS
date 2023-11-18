DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;
\c blog;

CREATE TYPE user_type AS ENUM ('author', 'reader');

CREATE TABLE blog_user(
    id                  serial PRIMARY KEY,
    name                varchar(30) NOT NULL,
    email               varchar(50) NOT NULL UNIQUE,
    password            char(30) NOT NULL,
    type                user_type DEFAULT 'author'
);

CREATE TABLE post(
    id                  serial PRIMARY KEY,
    title               varchar(50) NOT NULL,
    text                text NOT NULL,
    date_time           timestamp DEFAULT CURRENT_TIMESTAMP,
    is_sharable         boolean DEFAULT false
);

CREATE TABLE author_posts(
    author_id           integer  NOT NULL,
    post_id             integer  NOT NULL,
    FOREIGN KEY (author_id) REFERENCES blog_user (id),
    FOREIGN KEY (post_id) REFERENCES post (id),
    PRIMARY KEY (author_id, post_id)
);


CREATE TABLE address(
    id                  serial PRIMARY KEY,
    district            varchar(50) NOT NULL,
    street              varchar(50) NOT NULL,
    number              integer NOT NULL,
    complement          varchar(10),
    zip_code            char(11) NOT NULL,
    reader_id           integer  NOT NULL,
    FOREIGN KEY (reader_id) REFERENCES blog_user (id)
);
