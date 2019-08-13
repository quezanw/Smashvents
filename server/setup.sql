-- CREATE DATABASE
\c postgres
DROP DATABASE smashvents;
CREATE DATABASE smashvents;
\c smashvents 

CREATE TABLE events (
  event_id     SERIAL,
  user_id      INTEGER      NOT NULL,
  title        VARCHAR(254) NOT NULL,
  description  VARCHAR(8000),
  ruleset      VARCHAR(8000),
  venue        VARCHAR(254),
  online       BOOLEAN      NOT NULL,
  start_date   DATE         NOT NULL,
  start_time   TIME         NOT NULL,
  end_time     TIME,
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
  'Salem',
  'test',
  'account',
  'test@account1.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Mkleo',
  'test',
  'account',
  'test@account2.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Samsora',
  'test',
  'account',
  'test@account3.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Bassmage',
  'test',
  'account',
  'test@account4.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Gin',
  'test',
  'account',
  'test@account5.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Zero',
  'test',
  'account',
  'test@account6.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'leffen',
  'test',
  'account',
  'test@account7.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'Zackaray',
  'test',
  'account',
  'test@account8.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'CrossXG',
  'test',
  'account',
  'test@account9.com',
  'password123'
);

INSERT INTO users
(username, first_name, last_name, email, password)
VALUES (
  'MVD',
  'test',
  'account',
  'test@account10.com',
  'password123'
);

INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  3,
  'Smash n splash',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2020-09-20',
  '12:00:00',
  '24:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  5,
  'Orbitar',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2019-10-23',
  '15:00:00',
  '20:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  6,
  'Defend The North',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  FALSE,
  '2019-12-01',
  '14:00:00',
  '16:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  7,
  'UW Smash Tournament',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2019-11-05',
  '12:00:00',
  '18:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  2,
  'Low Tier city',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  FALSE,
  '2020-04-20',
  '13:00:00',
  '21:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES (
  9,
  'ONLINE SMASH TOURNAMENT',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2020-02-21',
  '12:00:00',
  '18:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES ( 
  10,
  'Frostbite 2020',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2020-05-12',
  '12:00:00',
  '18:00:00'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time)
VALUES ( 
  4,
  'Smash Con 2019',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '1530 SMash ville street',
  TRUE,
  '2019-08-12',
  '12:00:00',
  '18:00:00'
);

INSERT INTO attendees (user_id, event_id) VALUES (1,1);
INSERT INTO attendees (user_id, event_id) VALUES (2,1);
INSERT INTO attendees (user_id, event_id) VALUES (3,1);
INSERT INTO attendees (user_id, event_id) VALUES (4,1);
INSERT INTO attendees (user_id, event_id) VALUES (5,1);
INSERT INTO attendees (user_id, event_id) VALUES (6,1);
INSERT INTO attendees (user_id, event_id) VALUES (7,1);
INSERT INTO attendees (user_id, event_id) VALUES (8,1);

INSERT INTO attendees (user_id, event_id) VALUES (9,2);
INSERT INTO attendees (user_id, event_id) VALUES (2,2);
INSERT INTO attendees (user_id, event_id) VALUES (3,2);
INSERT INTO attendees (user_id, event_id) VALUES (4,2);
INSERT INTO attendees (user_id, event_id) VALUES (5,2);
INSERT INTO attendees (user_id, event_id) VALUES (6,2);
INSERT INTO attendees (user_id, event_id) VALUES (7,2);
INSERT INTO attendees (user_id, event_id) VALUES (10,2);

INSERT INTO attendees (user_id, event_id) VALUES (1,3);
INSERT INTO attendees (user_id, event_id) VALUES (2,3);
INSERT INTO attendees (user_id, event_id) VALUES (3,3);
INSERT INTO attendees (user_id, event_id) VALUES (4,3);
INSERT INTO attendees (user_id, event_id) VALUES (5,3);
INSERT INTO attendees (user_id, event_id) VALUES (6,3);
INSERT INTO attendees (user_id, event_id) VALUES (7,3);
INSERT INTO attendees (user_id, event_id) VALUES (8,3);

INSERT INTO attendees (user_id, event_id) VALUES (1,4);
INSERT INTO attendees (user_id, event_id) VALUES (2,4);
INSERT INTO attendees (user_id, event_id) VALUES (3,4);
INSERT INTO attendees (user_id, event_id) VALUES (4,4);
INSERT INTO attendees (user_id, event_id) VALUES (5,4);
INSERT INTO attendees (user_id, event_id) VALUES (6,4);
INSERT INTO attendees (user_id, event_id) VALUES (7,4);
INSERT INTO attendees (user_id, event_id) VALUES (8,4);

INSERT INTO attendees (user_id, event_id) VALUES (1,5);
INSERT INTO attendees (user_id, event_id) VALUES (2,5);
INSERT INTO attendees (user_id, event_id) VALUES (3,5);
INSERT INTO attendees (user_id, event_id) VALUES (4,5);
INSERT INTO attendees (user_id, event_id) VALUES (5,5);
INSERT INTO attendees (user_id, event_id) VALUES (6,5);
INSERT INTO attendees (user_id, event_id) VALUES (7,5);
INSERT INTO attendees (user_id, event_id) VALUES (8,5);

INSERT INTO attendees (user_id, event_id) VALUES (1,6);
INSERT INTO attendees (user_id, event_id) VALUES (2,6);
INSERT INTO attendees (user_id, event_id) VALUES (3,6);
INSERT INTO attendees (user_id, event_id) VALUES (4,6);
INSERT INTO attendees (user_id, event_id) VALUES (5,6);
INSERT INTO attendees (user_id, event_id) VALUES (6,6);
INSERT INTO attendees (user_id, event_id) VALUES (7,6);
INSERT INTO attendees (user_id, event_id) VALUES (8,6);

INSERT INTO attendees (user_id, event_id) VALUES (1,7);
INSERT INTO attendees (user_id, event_id) VALUES (2,7);
INSERT INTO attendees (user_id, event_id) VALUES (3,7);
INSERT INTO attendees (user_id, event_id) VALUES (4,7);
INSERT INTO attendees (user_id, event_id) VALUES (5,7);
INSERT INTO attendees (user_id, event_id) VALUES (6,7);
INSERT INTO attendees (user_id, event_id) VALUES (7,7);
INSERT INTO attendees (user_id, event_id) VALUES (8,7);

INSERT INTO attendees (user_id, event_id) VALUES (1,8);
INSERT INTO attendees (user_id, event_id) VALUES (2,8);
INSERT INTO attendees (user_id, event_id) VALUES (3,8);
INSERT INTO attendees (user_id, event_id) VALUES (4,8);
INSERT INTO attendees (user_id, event_id) VALUES (5,8);
INSERT INTO attendees (user_id, event_id) VALUES (6,8);
INSERT INTO attendees (user_id, event_id) VALUES (7,8);
INSERT INTO attendees (user_id, event_id) VALUES (8,8);



