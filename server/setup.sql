-- CREATE DATABASE
CREATE DATABASE smashvents;
\c smashvents 

CREATE TABLE events (
  event_id     SERIAL,
  user_id      INTEGER      NOT NULL,
  title        VARCHAR(254) NOT NULL,
  description  VARCHAR(254),
  ruleset      VARCHAR(8000),
  venue        VARCHAR(254),
  online       BOOLEAN,
  offline      BOOLEAN,
  start_date   TIMESTAMP    NOT NULL,
  created_date TIMESTAMP	  NOT NULL	DEFAULT NOW(),
  updated_date TIMESTAMP    NOT NULL	DEFAULT NOW()
);

CREATE TABLE users (
  user_id      SERIAL,
  username     VARCHAR(254) NOT NULL,
  first_name   VARCHAR(254) NOT NULL,
  last_name    VARCHAR(254) NOT NULL,
  email        VARCHAR(254) NOT NULL,
  password     VARCHAR(254) NOT NULL,
  created_date TIMESTAMP	  NOT NULL	DEFAULT NOW(),
  updated_date TIMESTAMP    NOT NULL	DEFAULT NOW()
);

CREATE TABLE attendees (
  attendee_id SERIAL,
  user_id     INTEGER NOT NULL,
  event_id    INTEGER NOT NULL
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'testaccount',
  'test',
  'account',
  'test@account.com',
  'password123'
);

INSERT INTO events 
(user_id, title, description, ruleset, venue, online, offline, start_date)
VALUES (
  1,
  'Low Tier city',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  FALSE,
  '2019-11-23 18:00:00'
);
