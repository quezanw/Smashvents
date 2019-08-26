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
  end_time     TIME         NOT NULL,  
  banner_path  VARCHAR(254) NOT NULL,
  icon_path    VARCHAR(254) NOT NULL,
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
  theme_color  VARCHAR(254) NOT NULL,
  created_date TIMESTAMP	  NOT NULL	DEFAULT NOW(),
  updated_date TIMESTAMP    NOT NULL	DEFAULT NOW()
);

CREATE TABLE attendees (
  attendee_id SERIAL,
  user_id     INTEGER NOT NULL,
  event_id    INTEGER NOT NULL
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Salem',
  'Akeil',
  'Young',
  'test@account1.com',
  'password123',
  '#7185AD'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Mkleo',
  'Leonardo',
  'Perez',
  'test@account2.com',
  'password123',
  '#AAADC7'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Samsora',
  'Ezra',
  'Morris',
  'test@account3.com',
  'password123',
  '#D8753B'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Bassmage',
  'Troy',
  'Waters',
  'test@account4.com',
  'password123',
  '#F19A49'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'ESAM',
  'Eric',
  'Lew',
  'test@account5.com',
  'password123',
  '#38A089'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Zero',
  'Gonzalo',
  'Barrios',
  'test@account6.com',
  'password123',
  '#6ABBAA'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'leffen',
  'William',
  'Hjelte',
  'test@account7.com',
  'password123',
  '#FF7480'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Zackray',
  'Sota',
  'Okada',
  'test@account8.com',
  'password123',
  '#FF9DA6'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'CrossXG',
  'Best',
  'Puff',
  'test@account9.com',
  'password123',
  '#69A6C3'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Tweek',
  'Gavin',
  'Dempsey',
  'test@account10.com',
  'password123',
  '#795D50'
);

INSERT INTO users
(username, first_name, last_name, email, password, theme_color)
VALUES (
  'Wizzrobe',
  'Justin',
  'Hallet',
  'test@account10.com',
  'password123',
  '#2A2A2A'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  3,
  'Smash n splash 6',
  'Welcome to Smash N Splash!
    Gamers HQ is back in the Waterpark Capital of the World for Smash N Splash 5! Join us on May 31st - June 2nd, 2019, as the best players from around the world compete in over 13 different gaming tournaments!
    This year, we have EXPANDED to over 50,000 square feet of event space! Plenty of room for gaming, vendors, socializing, and more! And with the return of the Overnight Block there will be plenty of time for side events and friendlies too!
    Pack up your swimtrunks and controllers...
    Cause its time to Smash and Splash!',
  'no rules',
  '1305 Kalahari Dr, Wisconsin Dells, WI 53965, USA',
  FALSE,
  '2020-09-20',
  '12:00:00',
  '24:00:00',
  '/banner2.jpg',
  '/event_icon1.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  5,
  'Orbitar 100',
  'Bring your controller out every other Friday for Orbitar, Seattles premier Smash Ultimate bi-weekly, at GameWorks! PREREGISTRATION ONLINE IS MANDATORY. Sign up here before 10 PM on Thursday the week of the event, then pay at the venue with cash! Our player cap is 160 entrants, so make sure you sign up soon if you plan on going.
  In addition to the bracket, we’ll have setups dedicated to friendlies. Smashers of all skill levels--and ages--are welcome! (Minors normally have to leave GameWorks at 10 PM, but anyone attending our event can stay for the whole duration!)
  If you can’t make it out, you should be able to catch some of the action at https://twitch.tv/SatelliteSmash and https://twitch.tv/GameWorksSeattle. VODs will later be uploaded to www.satellitesmash.com.',
  'no rules',
  '1511 7th Ave, Seattle, WA 98101, USA',
  FALSE,
  '2019-10-23',
  '15:00:00',
  '20:00:00',
  '/banner5.jpg',
  '/event_icon1.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  6,
  'Defend The North',
  'The New Yorker Hotel hosts Defend the North: New York Citys only Major Fighting Game Tournament! Widely considered to be one of the biggest travel destinations in the world, NYC is also home to a diverse gaming community with a rich and storied legacy. Dont miss out on the savings with pre-registration as it ends on July 12th. This summer, be a part of that legacy and register today!
    Stay updated on all DTN2019 info such as tournament brackets, scheduling, announcements, streams and more by signing up for our newsletter!',
  'no rules',
  '481 8th Ave, New York, NY 10001, USA',
  FALSE,
  '2019-12-01',
  '14:00:00',
  '16:00:00',
  '/banner3.jpg',
  '/event_icon1.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  7,
  'Super Smash Con 2019',
  'The Worlds Largest Smash Bros Event is back! Super Smash Con will be held on August 8-11, 2019 at the Dulles Expo Center, in Chantilly, VA.
   Find out more at supersmashcon.com
   Standard Registration is available until July 24th
   Emergency Registration is available until July 31st. Teammate matching will also end on July 31st.',
  'no rules',
  '4320 Chantilly Shopping Center, Chantilly, VA 20151, USA',
  FALSE,
  '2019-11-05',
  '12:00:00',
  '18:00:00',
  '/banner5.jpg',
  '/event_icon2.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  2,
  'Low Tier city',
  'The largest Smash Bros. tournament in Texas is back, bigger and better than ever! Low Tier City 7 returns July 12th-14th, with a brand new venue: Esports Stadium Arlington! For a full three days, the largest dedicated esports facility in North America will be filled with Smash Bros, fighting games, and more! This will be Smash Ultimates first year at LTC, and we are adding a slew of new events: including traditional fighting games and Brawlhalla, which features $20,000 in prizes!
   Top professionals from all over the world will be competing for thousands of dollars at LTC 7, you dont want to miss out! Compete against the best players in the world, and watch the finals unfold on stage. Register ASAP to claim your spot at the event! ',
  'no rules',
  '1200 Ballpark Way, Arlington, TX 76011, USA',
  FALSE,
  '2020-04-20',
  '13:00:00',
  '21:00:00',
  '/banner1.jpg',
  '/event_icon3.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES (
  9,
  'ONLINE SMASH TOURNAMENT',
  'come and join the first smash event of the year and play against top ranked players!',
  'no rules',
  '',
  TRUE,
  '2020-02-21',
  '12:00:00',
  '18:00:00',
  '/banner2.jpg',
  '/event_icon2.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES ( 
  10,
  'Frostbite 2020',
  'Frostbite gets the ULTIMATE upgrade in 2019. We are a convention style tournament experience: special guests, tabletop gaming, cosplay contest, and more! For our 4th installment, Super Smash Bros. Ultimate Singles and Doubles join the main event lineup. Rivals of Aether makes its return to Frostbite this year, this time with doubles as a main event! As Frostbite is one of the few Nintendo partnered events of the year, Frostbite 2019 is a must-attend event in Q1 2019!',
  'no rules',
  'Crowne Plaza Detroit Downtown Convention Center, 2 Washington Blvd, Detroit, MI 48226, USA',
  FALSE,
  '2020-05-12',
  '12:00:00',
  '18:00:00',
  '/banner3.jpg',
  '/event_icon2.png'
);

INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES ( 
  4,
  'Nintendo 2019 World Championships',
  'ELEAGUE and Nintendo are partnering to showcase high-level players and exciting competitive moments through a three-episode ELEAGUE television series focused on three tournaments held in Los Angeles in June 2019. ELEAGUE Presents The Nintendo 2019 World Championships – set to premiere Sunday, Aug. 25, at 1 p.m. ET on CBS – will take fans backstage and behind the controller with professional players as they compete across three Nintendo Switch video games; Super Mario Maker 2, Splatoon 2 and Super Smash Bros. Ultimate.',
  'no rules',
  '',
  TRUE,
  '2020-05-12',
  '12:00:00',
  '18:00:00',
  '/banner6.jpg',
  '/event_icon2.png'
);


INSERT INTO events 
(user_id, title, description, ruleset, venue, online, start_date, start_time, end_time, banner_path, icon_path)
VALUES ( 
  4,
  'Shine 2019',
  'Shine 2019 will be held at the DCU Center Convention Center. Attached to the arena the convention center is located in the heart of Worcester MA.',
  'no rules',
  '50 Foster St, Worcester, MA 01608, USA',
  FALSE,
  '2019-08-12',
  '12:00:00',
  '18:00:00',
  '/banner2.jpg',
  '/event_icon3.png'
);

INSERT INTO attendees (user_id, event_id) VALUES (1,1);
INSERT INTO attendees (user_id, event_id) VALUES (2,1);
INSERT INTO attendees (user_id, event_id) VALUES (3,1);
INSERT INTO attendees (user_id, event_id) VALUES (4,1);
INSERT INTO attendees (user_id, event_id) VALUES (5,1);
INSERT INTO attendees (user_id, event_id) VALUES (6,1);
INSERT INTO attendees (user_id, event_id) VALUES (7,1);
INSERT INTO attendees (user_id, event_id) VALUES (8,1);
INSERT INTO attendees (user_id, event_id) VALUES (9,1);

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
INSERT INTO attendees (user_id, event_id) VALUES (9,4);

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
INSERT INTO attendees (user_id, event_id) VALUES (9,7);

INSERT INTO attendees (user_id, event_id) VALUES (1,8);
INSERT INTO attendees (user_id, event_id) VALUES (2,8);
INSERT INTO attendees (user_id, event_id) VALUES (3,8);
INSERT INTO attendees (user_id, event_id) VALUES (4,8);
INSERT INTO attendees (user_id, event_id) VALUES (5,8);
INSERT INTO attendees (user_id, event_id) VALUES (6,8);
INSERT INTO attendees (user_id, event_id) VALUES (7,8);
INSERT INTO attendees (user_id, event_id) VALUES (8,8);



