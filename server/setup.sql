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

insert into users (first_name, last_name, email, username, password, theme_color) values ('Roda', 'Luchetti', 'rluchetti0@posterous.com', 'rluchetti0', 'dzebvGMIgI', '#0a8029');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Pattie', 'Bilfoot', 'pbilfoot1@un.org', 'pbilfoot1', 'dUf9gsRM', '#bf9699');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Carolyne', 'Blacktin', 'cblacktin2@redcross.org', 'cblacktin2', 'XbNRZTKCZI4', '#f15b5b');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Tobi', 'McGahern', 'tmcgahern3@list-manage.com', 'tmcgahern3', 'otP3FvW5NsF', '#27e535');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Katha', 'Cogan', 'kcogan4@ucoz.ru', 'kcogan4', 'i4uWAWPkUI8', '#0daf25');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Colas', 'Pragnell', 'cpragnell5@usatoday.com', 'cpragnell5', 'UlRZi9', '#4d4ca1');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Shirlene', 'Aluard', 'saluard6@imageshack.us', 'saluard6', 'Bb4j7q8JspX', '#f91385');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Patrizio', 'Whannel', 'pwhannel7@marketwatch.com', 'pwhannel7', 'vfSFwIAP', '#1c2bcd');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Vidovic', 'Emmet', 'vemmet8@hibu.com', 'vemmet8', 'WcUTrz99n', '#fdd637');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Flin', 'Rennie', 'frennie9@weibo.com', 'frennie9', 'Z3YyO0xBx', '#85a937');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Stacee', 'Filipponi', 'sfilipponia@admin.ch', 'sfilipponia', 'ysigILyr0', '#50752e');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Koren', 'De Gogay', 'kdegogayb@discovery.com', 'kdegogayb', 'pfu6VUqBZKV', '#24a13d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Judith', 'Traynor', 'jtraynorc@gravatar.com', 'jtraynorc', '5f6w5mrMt', '#114e46');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Henriette', 'Syddon', 'hsyddond@edublogs.org', 'hsyddond', 'rhH787', '#a176d6');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Eldin', 'Campanelle', 'ecampanellee@moonfruit.com', 'ecampanellee', 'WJFP38', '#4757ad');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Britney', 'Golby', 'bgolbyf@netvibes.com', 'bgolbyf', 'D07tSQ', '#57f039');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Andria', 'Passman', 'apassmang@cornell.edu', 'apassmang', '3wMhFPd', '#093b9a');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Derrick', 'Ryce', 'dryceh@fastcompany.com', 'dryceh', 'izxC7b', '#97b6f3');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Tann', 'Hitcham', 'thitchami@istockphoto.com', 'thitchami', 'IC7cNbZ', '#ef4105');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Shaine', 'Ecclestone', 'secclestonej@trellian.com', 'secclestonej', '60xF46iT6dJ', '#15a581');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Callie', 'Arangy', 'carangyk@ovh.net', 'carangyk', '1T8zGpb', '#689c8e');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Bruis', 'Garret', 'bgarretl@sbwire.com', 'bgarretl', 'i3upv8', '#9060d2');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Glory', 'Valentinetti', 'gvalentinettim@yellowpages.com', 'gvalentinettim', 'aD0HNFzzTJ', '#8bdf12');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Haydon', 'De Ruggero', 'hderuggeron@vistaprint.com', 'hderuggeron', 'Y8xaKIONoL', '#8ec0d5');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Vladamir', 'Scoffham', 'vscoffhamo@qq.com', 'vscoffhamo', 'iGLT3NgZ', '#36b38d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Iorgo', 'Follett', 'ifollettp@live.com', 'ifollettp', 'YXGPqvaHN', '#baba08');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Kristen', 'Warbey', 'kwarbeyq@fastcompany.com', 'kwarbeyq', 'KqRtBT', '#4c7e68');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Roxy', 'MacClure', 'rmacclurer@icq.com', 'rmacclurer', 'Tn6HcRxT', '#fe425a');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Elsa', 'Pedrocco', 'epedroccos@meetup.com', 'epedroccos', 'xhrOv8Wj', '#3030cb');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Benyamin', 'Carillo', 'bcarillot@statcounter.com', 'bcarillot', 'wybNMPCFaUO', '#866f70');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Donny', 'Hrinchenko', 'dhrinchenkou@va.gov', 'dhrinchenkou', 'f7O6aHu8y', '#ba37c9');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Ellery', 'McCandie', 'emccandiev@simplemachines.org', 'emccandiev', 'ZDYF0pRQJG2', '#347189');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Blanche', 'Abrahamson', 'babrahamsonw@constantcontact.com', 'babrahamsonw', 'swBN7nP', '#b06019');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Dicky', 'Meatyard', 'dmeatyardx@cbslocal.com', 'dmeatyardx', 'QMgppwUp', '#d66070');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Rodolfo', 'Dallywater', 'rdallywatery@oaic.gov.au', 'rdallywatery', 'LFywVM4', '#4b8623');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Jacquenetta', 'Farrar', 'jfarrarz@yellowbook.com', 'jfarrarz', 'Ud4woDrbC', '#6c17e7');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Sam', 'Stilliard', 'sstilliard10@dyndns.org', 'sstilliard10', 'F4PS1SH', '#ace2fd');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Malissia', 'Jackes', 'mjackes11@cloudflare.com', 'mjackes11', 'C1RarkM1', '#e5fedb');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Lanny', 'Diwell', 'ldiwell12@alibaba.com', 'ldiwell12', '0ems0eRSUjB', '#2c6c61');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Merola', 'Mantione', 'mmantione13@dell.com', 'mmantione13', '3OxLC3tECV', '#651f9c');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Paolo', 'Kitson', 'pkitson14@sogou.com', 'pkitson14', 'HFOyBbH5d', '#389e1b');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Selig', 'Galpen', 'sgalpen15@wikimedia.org', 'sgalpen15', 'Qj4q2r', '#ec1bf5');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Abbe', 'Rosenhaus', 'arosenhaus16@yellowbook.com', 'arosenhaus16', 'T0KN1v9', '#f1aafe');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Dulciana', 'Padberry', 'dpadberry17@com.com', 'dpadberry17', 'Hnf3PygQXfio', '#1bd103');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Carlin', 'Warrender', 'cwarrender18@auda.org.au', 'cwarrender18', 'ivxl5RS4WKhR', '#d023ae');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Bellanca', 'Merrydew', 'bmerrydew19@go.com', 'bmerrydew19', 'URMknq', '#6a52de');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Jamal', 'Bale', 'jbale1a@gravatar.com', 'jbale1a', 'bVnB2Vg', '#e6b498');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Melany', 'MacCosto', 'mmaccosto1b@dropbox.com', 'mmaccosto1b', 'CzPtHVa5', '#8e53ea');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Emlyn', 'Hargreave', 'ehargreave1c@wisc.edu', 'ehargreave1c', 'jXkZ9XZk3dk', '#2c49e6');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Gaultiero', 'Christopher', 'gchristopher1d@plala.or.jp', 'gchristopher1d', 'BKHnYehFS', '#bd04b9');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Aylmer', 'Speerman', 'aspeerman1e@kickstarter.com', 'aspeerman1e', 'UDbzieQf6', '#ebd06e');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Lucila', 'Roony', 'lroony1f@purevolume.com', 'lroony1f', '50I4xyZKHnm', '#f7fef4');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Damiano', 'Perch', 'dperch1g@geocities.com', 'dperch1g', 'gy4xNUa', '#348ddd');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Katine', 'Doxey', 'kdoxey1h@foxnews.com', 'kdoxey1h', 'sg0m594', '#77103b');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Jermayne', 'Imlock', 'jimlock1i@harvard.edu', 'jimlock1i', 'eBgRYmKpk', '#34245a');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Reese', 'McCafferky', 'rmccafferky1j@hugedomains.com', 'rmccafferky1j', 'GDorEQXOGZS', '#89064e');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Guinna', 'Puckett', 'gpuckett1k@surveymonkey.com', 'gpuckett1k', 'KqGCb4rKcNnv', '#50bd06');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Franky', 'Cuffin', 'fcuffin1l@blog.com', 'fcuffin1l', 's9XwUllNt', '#699480');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Gerhard', 'Blowen', 'gblowen1m@privacy.gov.au', 'gblowen1m', 'HJIPOr6a3dmK', '#22f0be');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Freddie', 'Silvers', 'fsilvers1n@washingtonpost.com', 'fsilvers1n', '851QGQy4v', '#df538d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Rivi', 'Shadwick', 'rshadwick1o@fastcompany.com', 'rshadwick1o', 'VAxcQH', '#88cf0d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Devina', 'Schaumann', 'dschaumann1p@usgs.gov', 'dschaumann1p', 'lSKOPPiKC9', '#9dbf74');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Jasmina', 'Corkhill', 'jcorkhill1q@topsy.com', 'jcorkhill1q', 'Kcch00q', '#6e2e4c');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Hedwig', 'Akhurst', 'hakhurst1r@miitbeian.gov.cn', 'hakhurst1r', 'c8meZAxH7X', '#fd6cd2');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Meriel', 'Meneo', 'mmeneo1s@microsoft.com', 'mmeneo1s', 'X8z1YCu1Ljo', '#1019ef');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Madonna', 'Berzins', 'mberzins1t@ftc.gov', 'mberzins1t', 'KxhXPhRmFu1u', '#23c2b3');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Allyn', 'Wiltshier', 'awiltshier1u@bluehost.com', 'awiltshier1u', 'jDkPb0V03f1v', '#eca551');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Orin', 'Piddock', 'opiddock1v@miibeian.gov.cn', 'opiddock1v', 'MjMVbAaaSg', '#dca57a');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Salvatore', 'Verbruggen', 'sverbruggen1w@artisteer.com', 'sverbruggen1w', '7SECNihZ6', '#db6079');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Lucian', 'MacBean', 'lmacbean1x@gov.uk', 'lmacbean1x', 'lIfH3d', '#bb5c1c');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Sue', 'Duer', 'sduer1y@geocities.com', 'sduer1y', 'XYVQFLO5Isp', '#647901');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Yvor', 'MacGowing', 'ymacgowing1z@examiner.com', 'ymacgowing1z', 'dg41N0AGRbW', '#531dfd');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Sosanna', 'Kitcher', 'skitcher20@businessweek.com', 'skitcher20', 'FMwPRhKoBpmn', '#6a3585');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Claudie', 'Toquet', 'ctoquet21@skype.com', 'ctoquet21', 'o0XZu5X6w', '#ae1a78');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Mariette', 'Lutwyche', 'mlutwyche22@cam.ac.uk', 'mlutwyche22', '5aFfE95bX7', '#f2e59d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Gayler', 'Argo', 'gargo23@paginegialle.it', 'gargo23', 'kyjKh9PTzEJ', '#ae36fb');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Ivor', 'Stother', 'istother24@google.ca', 'istother24', 'ZzvBrFi2djG', '#e75578');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Aleen', 'Gryglewski', 'agryglewski25@google.pl', 'agryglewski25', '1OvLhBk', '#b54e1b');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Abbi', 'Mebs', 'amebs26@yale.edu', 'amebs26', '1Ak8ja', '#e4e53d');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Gothart', 'Chown', 'gchown27@ftc.gov', 'gchown27', '4Kk60YYS9d', '#46902f');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Archer', 'Mutlow', 'amutlow28@slashdot.org', 'amutlow28', 'AxfCJHn9qRk', '#e2c5df');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Wanids', 'Eales', 'weales29@google.co.jp', 'weales29', 'hDLSqmKIhOHK', '#100337');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Millicent', 'Petrou', 'mpetrou2a@fastcompany.com', 'mpetrou2a', 'FjGUrV6hp1tq', '#3082ae');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Isidoro', 'Landis', 'ilandis2b@weebly.com', 'ilandis2b', 'Qoo6JYZzN', '#90d07b');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Willow', 'Olenov', 'wolenov2c@google.fr', 'wolenov2c', 'tWpFjUPyW', '#c8e062');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Julissa', 'Quincey', 'jquincey2d@pen.io', 'jquincey2d', 'c8ytySxMP', '#3805ad');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Gordy', 'Fullerlove', 'gfullerlove2e@statcounter.com', 'gfullerlove2e', 'aJclrw', '#fbfe09');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Anet', 'Poulsen', 'apoulsen2f@ifeng.com', 'apoulsen2f', 'higCcpWwaMk', '#9a9502');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Dilly', 'Cornely', 'dcornely2g@gnu.org', 'dcornely2g', 'r9Dhll', '#2a34f6');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Anselma', 'Congrave', 'acongrave2h@noaa.gov', 'acongrave2h', 'c61Rimw', '#1c2301');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Roshelle', 'Bullene', 'rbullene2i@github.io', 'rbullene2i', 'cp5iiaWXA7', '#2e2103');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Nadine', 'Bockin', 'nbockin2j@jugem.jp', 'nbockin2j', '14cvquXy4Sp', '#3c2027');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Creigh', 'Savaage', 'csavaage2k@godaddy.com', 'csavaage2k', 'OSYx7c9CGt', '#b2c3c1');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Averil', 'Earngy', 'aearngy2l@ebay.co.uk', 'aearngy2l', 'Z3lv71BB4dY', '#e84c56');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Lorens', 'Leser', 'lleser2m@biblegateway.com', 'lleser2m', 'c7ogyhEqwmH', '#1ac930');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Jordanna', 'Woodberry', 'jwoodberry2n@salon.com', 'jwoodberry2n', '6mw00N', '#ab744f');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Charita', 'Rosbotham', 'crosbotham2o@amazon.com', 'crosbotham2o', 'UEOGm2LAy44', '#51da37');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Neall', 'Dowey', 'ndowey2p@livejournal.com', 'ndowey2p', 'fpQrOV9i4IC', '#e83b86');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Koo', 'Fleischer', 'kfleischer2q@yellowbook.com', 'kfleischer2q', 'TbfkXDZjp', '#849700');
insert into users (first_name, last_name, email, username, password, theme_color) values ('Katrinka', 'Kneel', 'kkneel2r@xrea.com', 'kkneel2r', 'l4JQWSteMYgU', '#b35102');



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
INSERT INTO attendees (user_id, event_id) VALUES (10,1);
INSERT INTO attendees (user_id, event_id) VALUES (11,1);
INSERT INTO attendees (user_id, event_id) VALUES (12,1);
INSERT INTO attendees (user_id, event_id) VALUES (13,1);
INSERT INTO attendees (user_id, event_id) VALUES (14,1);
INSERT INTO attendees (user_id, event_id) VALUES (15,1);
INSERT INTO attendees (user_id, event_id) VALUES (16,1);
INSERT INTO attendees (user_id, event_id) VALUES (17,1);
INSERT INTO attendees (user_id, event_id) VALUES (18,1);
INSERT INTO attendees (user_id, event_id) VALUES (19,1);
INSERT INTO attendees (user_id, event_id) VALUES (20,1);
INSERT INTO attendees (user_id, event_id) VALUES (21,1);
INSERT INTO attendees (user_id, event_id) VALUES (22,1);
INSERT INTO attendees (user_id, event_id) VALUES (23,1);
INSERT INTO attendees (user_id, event_id) VALUES (24,1);
INSERT INTO attendees (user_id, event_id) VALUES (25,1);
INSERT INTO attendees (user_id, event_id) VALUES (26,1);
INSERT INTO attendees (user_id, event_id) VALUES (27,1);
INSERT INTO attendees (user_id, event_id) VALUES (70,1);
INSERT INTO attendees (user_id, event_id) VALUES (71,1);
INSERT INTO attendees (user_id, event_id) VALUES (72,1);
INSERT INTO attendees (user_id, event_id) VALUES (73,1);
INSERT INTO attendees (user_id, event_id) VALUES (74,1);
INSERT INTO attendees (user_id, event_id) VALUES (75,1);
INSERT INTO attendees (user_id, event_id) VALUES (76,1);
INSERT INTO attendees (user_id, event_id) VALUES (77,1);
INSERT INTO attendees (user_id, event_id) VALUES (78,1);
INSERT INTO attendees (user_id, event_id) VALUES (79,1);
INSERT INTO attendees (user_id, event_id) VALUES (70,1);
INSERT INTO attendees (user_id, event_id) VALUES (71,1);
INSERT INTO attendees (user_id, event_id) VALUES (72,1);
INSERT INTO attendees (user_id, event_id) VALUES (73,1);
INSERT INTO attendees (user_id, event_id) VALUES (74,1);
INSERT INTO attendees (user_id, event_id) VALUES (75,1);
INSERT INTO attendees (user_id, event_id) VALUES (76,1);
INSERT INTO attendees (user_id, event_id) VALUES (77,1);
INSERT INTO attendees (user_id, event_id) VALUES (30,1);
INSERT INTO attendees (user_id, event_id) VALUES (31,1);
INSERT INTO attendees (user_id, event_id) VALUES (32,1);
INSERT INTO attendees (user_id, event_id) VALUES (33,1);
INSERT INTO attendees (user_id, event_id) VALUES (34,1);
INSERT INTO attendees (user_id, event_id) VALUES (35,1);
INSERT INTO attendees (user_id, event_id) VALUES (36,1);
INSERT INTO attendees (user_id, event_id) VALUES (37,1);
INSERT INTO attendees (user_id, event_id) VALUES (38,1);
INSERT INTO attendees (user_id, event_id) VALUES (39,1);
INSERT INTO attendees (user_id, event_id) VALUES (30,1);
INSERT INTO attendees (user_id, event_id) VALUES (31,1);
INSERT INTO attendees (user_id, event_id) VALUES (32,1);
INSERT INTO attendees (user_id, event_id) VALUES (33,1);
INSERT INTO attendees (user_id, event_id) VALUES (34,1);
INSERT INTO attendees (user_id, event_id) VALUES (35,1);
INSERT INTO attendees (user_id, event_id) VALUES (36,1);
INSERT INTO attendees (user_id, event_id) VALUES (37,1);

INSERT INTO attendees (user_id, event_id) VALUES (9,2);
INSERT INTO attendees (user_id, event_id) VALUES (2,2);
INSERT INTO attendees (user_id, event_id) VALUES (3,2);
INSERT INTO attendees (user_id, event_id) VALUES (4,2);
INSERT INTO attendees (user_id, event_id) VALUES (5,2);
INSERT INTO attendees (user_id, event_id) VALUES (6,2);
INSERT INTO attendees (user_id, event_id) VALUES (7,2);
INSERT INTO attendees (user_id, event_id) VALUES (10,2);
INSERT INTO attendees (user_id, event_id) VALUES (11,2);
INSERT INTO attendees (user_id, event_id) VALUES (12,2);
INSERT INTO attendees (user_id, event_id) VALUES (13,2);
INSERT INTO attendees (user_id, event_id) VALUES (14,2);
INSERT INTO attendees (user_id, event_id) VALUES (15,2);
INSERT INTO attendees (user_id, event_id) VALUES (16,2);
INSERT INTO attendees (user_id, event_id) VALUES (17,2);
INSERT INTO attendees (user_id, event_id) VALUES (18,2);
INSERT INTO attendees (user_id, event_id) VALUES (19,2);
INSERT INTO attendees (user_id, event_id) VALUES (20,2);
INSERT INTO attendees (user_id, event_id) VALUES (21,2);
INSERT INTO attendees (user_id, event_id) VALUES (22,2);
INSERT INTO attendees (user_id, event_id) VALUES (23,2);
INSERT INTO attendees (user_id, event_id) VALUES (24,2);
INSERT INTO attendees (user_id, event_id) VALUES (25,2);
INSERT INTO attendees (user_id, event_id) VALUES (26,2);
INSERT INTO attendees (user_id, event_id) VALUES (27,2);
INSERT INTO attendees (user_id, event_id) VALUES (50,2);
INSERT INTO attendees (user_id, event_id) VALUES (51,2);
INSERT INTO attendees (user_id, event_id) VALUES (52,2);
INSERT INTO attendees (user_id, event_id) VALUES (53,2);
INSERT INTO attendees (user_id, event_id) VALUES (54,2);
INSERT INTO attendees (user_id, event_id) VALUES (55,2);
INSERT INTO attendees (user_id, event_id) VALUES (56,2);
INSERT INTO attendees (user_id, event_id) VALUES (57,2);
INSERT INTO attendees (user_id, event_id) VALUES (58,2);
INSERT INTO attendees (user_id, event_id) VALUES (59,2);
INSERT INTO attendees (user_id, event_id) VALUES (50,2);
INSERT INTO attendees (user_id, event_id) VALUES (51,2);
INSERT INTO attendees (user_id, event_id) VALUES (52,2);
INSERT INTO attendees (user_id, event_id) VALUES (53,2);
INSERT INTO attendees (user_id, event_id) VALUES (54,2);
INSERT INTO attendees (user_id, event_id) VALUES (55,2);
INSERT INTO attendees (user_id, event_id) VALUES (56,2);
INSERT INTO attendees (user_id, event_id) VALUES (57,2);

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
INSERT INTO attendees (user_id, event_id) VALUES (60,4);
INSERT INTO attendees (user_id, event_id) VALUES (61,4);
INSERT INTO attendees (user_id, event_id) VALUES (62,4);
INSERT INTO attendees (user_id, event_id) VALUES (63,4);
INSERT INTO attendees (user_id, event_id) VALUES (64,4);
INSERT INTO attendees (user_id, event_id) VALUES (65,4);
INSERT INTO attendees (user_id, event_id) VALUES (66,4);
INSERT INTO attendees (user_id, event_id) VALUES (67,4);
INSERT INTO attendees (user_id, event_id) VALUES (68,4);
INSERT INTO attendees (user_id, event_id) VALUES (69,4);
INSERT INTO attendees (user_id, event_id) VALUES (60,4);
INSERT INTO attendees (user_id, event_id) VALUES (61,4);
INSERT INTO attendees (user_id, event_id) VALUES (62,4);
INSERT INTO attendees (user_id, event_id) VALUES (63,4);
INSERT INTO attendees (user_id, event_id) VALUES (64,4);
INSERT INTO attendees (user_id, event_id) VALUES (65,4);
INSERT INTO attendees (user_id, event_id) VALUES (66,4);
INSERT INTO attendees (user_id, event_id) VALUES (67,4);

INSERT INTO attendees (user_id, event_id) VALUES (1,5);
INSERT INTO attendees (user_id, event_id) VALUES (2,5);
INSERT INTO attendees (user_id, event_id) VALUES (3,5);
INSERT INTO attendees (user_id, event_id) VALUES (4,5);
INSERT INTO attendees (user_id, event_id) VALUES (5,5);
INSERT INTO attendees (user_id, event_id) VALUES (6,5);
INSERT INTO attendees (user_id, event_id) VALUES (7,5);
INSERT INTO attendees (user_id, event_id) VALUES (8,5);
INSERT INTO attendees (user_id, event_id) VALUES (30,5);
INSERT INTO attendees (user_id, event_id) VALUES (31,5);
INSERT INTO attendees (user_id, event_id) VALUES (32,5);
INSERT INTO attendees (user_id, event_id) VALUES (33,5);
INSERT INTO attendees (user_id, event_id) VALUES (34,5);
INSERT INTO attendees (user_id, event_id) VALUES (35,5);
INSERT INTO attendees (user_id, event_id) VALUES (36,5);
INSERT INTO attendees (user_id, event_id) VALUES (37,5);
INSERT INTO attendees (user_id, event_id) VALUES (38,5);
INSERT INTO attendees (user_id, event_id) VALUES (39,5);
INSERT INTO attendees (user_id, event_id) VALUES (30,5);
INSERT INTO attendees (user_id, event_id) VALUES (31,5);
INSERT INTO attendees (user_id, event_id) VALUES (32,5);
INSERT INTO attendees (user_id, event_id) VALUES (33,5);
INSERT INTO attendees (user_id, event_id) VALUES (34,5);
INSERT INTO attendees (user_id, event_id) VALUES (35,5);
INSERT INTO attendees (user_id, event_id) VALUES (36,5);
INSERT INTO attendees (user_id, event_id) VALUES (37,5);

INSERT INTO attendees (user_id, event_id) VALUES (1,6);
INSERT INTO attendees (user_id, event_id) VALUES (2,6);
INSERT INTO attendees (user_id, event_id) VALUES (3,6);
INSERT INTO attendees (user_id, event_id) VALUES (4,6);
INSERT INTO attendees (user_id, event_id) VALUES (5,6);
INSERT INTO attendees (user_id, event_id) VALUES (6,6);
INSERT INTO attendees (user_id, event_id) VALUES (7,6);
INSERT INTO attendees (user_id, event_id) VALUES (8,6);
INSERT INTO attendees (user_id, event_id) VALUES (10,6);
INSERT INTO attendees (user_id, event_id) VALUES (11,6);
INSERT INTO attendees (user_id, event_id) VALUES (12,6);
INSERT INTO attendees (user_id, event_id) VALUES (13,6);
INSERT INTO attendees (user_id, event_id) VALUES (14,6);
INSERT INTO attendees (user_id, event_id) VALUES (15,6);
INSERT INTO attendees (user_id, event_id) VALUES (16,6);
INSERT INTO attendees (user_id, event_id) VALUES (17,6);
INSERT INTO attendees (user_id, event_id) VALUES (18,6);
INSERT INTO attendees (user_id, event_id) VALUES (19,6);
INSERT INTO attendees (user_id, event_id) VALUES (20,6);
INSERT INTO attendees (user_id, event_id) VALUES (21,6);
INSERT INTO attendees (user_id, event_id) VALUES (22,6);
INSERT INTO attendees (user_id, event_id) VALUES (23,6);
INSERT INTO attendees (user_id, event_id) VALUES (24,6);
INSERT INTO attendees (user_id, event_id) VALUES (25,6);
INSERT INTO attendees (user_id, event_id) VALUES (26,6);
INSERT INTO attendees (user_id, event_id) VALUES (27,6);

INSERT INTO attendees (user_id, event_id) VALUES (1,7);
INSERT INTO attendees (user_id, event_id) VALUES (2,7);
INSERT INTO attendees (user_id, event_id) VALUES (3,7);
INSERT INTO attendees (user_id, event_id) VALUES (4,7);
INSERT INTO attendees (user_id, event_id) VALUES (5,7);
INSERT INTO attendees (user_id, event_id) VALUES (6,7);
INSERT INTO attendees (user_id, event_id) VALUES (7,7);
INSERT INTO attendees (user_id, event_id) VALUES (8,7);
INSERT INTO attendees (user_id, event_id) VALUES (9,7);
INSERT INTO attendees (user_id, event_id) VALUES (40,7);
INSERT INTO attendees (user_id, event_id) VALUES (41,7);
INSERT INTO attendees (user_id, event_id) VALUES (42,7);
INSERT INTO attendees (user_id, event_id) VALUES (43,7);
INSERT INTO attendees (user_id, event_id) VALUES (44,7);
INSERT INTO attendees (user_id, event_id) VALUES (45,7);
INSERT INTO attendees (user_id, event_id) VALUES (46,7);
INSERT INTO attendees (user_id, event_id) VALUES (47,7);
INSERT INTO attendees (user_id, event_id) VALUES (48,7);
INSERT INTO attendees (user_id, event_id) VALUES (49,7);
INSERT INTO attendees (user_id, event_id) VALUES (40,7);
INSERT INTO attendees (user_id, event_id) VALUES (41,7);
INSERT INTO attendees (user_id, event_id) VALUES (42,7);
INSERT INTO attendees (user_id, event_id) VALUES (43,7);
INSERT INTO attendees (user_id, event_id) VALUES (44,7);
INSERT INTO attendees (user_id, event_id) VALUES (45,7);
INSERT INTO attendees (user_id, event_id) VALUES (46,7);
INSERT INTO attendees (user_id, event_id) VALUES (47,7);

INSERT INTO attendees (user_id, event_id) VALUES (1,8);
INSERT INTO attendees (user_id, event_id) VALUES (2,8);
INSERT INTO attendees (user_id, event_id) VALUES (3,8);
INSERT INTO attendees (user_id, event_id) VALUES (4,8);
INSERT INTO attendees (user_id, event_id) VALUES (5,8);
INSERT INTO attendees (user_id, event_id) VALUES (6,8);
INSERT INTO attendees (user_id, event_id) VALUES (7,8);
INSERT INTO attendees (user_id, event_id) VALUES (8,8);
INSERT INTO attendees (user_id, event_id) VALUES (10,8);
INSERT INTO attendees (user_id, event_id) VALUES (11,8);
INSERT INTO attendees (user_id, event_id) VALUES (12,8);
INSERT INTO attendees (user_id, event_id) VALUES (13,8);
INSERT INTO attendees (user_id, event_id) VALUES (14,8);
INSERT INTO attendees (user_id, event_id) VALUES (15,8);
INSERT INTO attendees (user_id, event_id) VALUES (16,8);
INSERT INTO attendees (user_id, event_id) VALUES (17,8);
INSERT INTO attendees (user_id, event_id) VALUES (18,8);
INSERT INTO attendees (user_id, event_id) VALUES (19,8);
INSERT INTO attendees (user_id, event_id) VALUES (20,8);
INSERT INTO attendees (user_id, event_id) VALUES (21,8);
INSERT INTO attendees (user_id, event_id) VALUES (22,8);
INSERT INTO attendees (user_id, event_id) VALUES (23,8);
INSERT INTO attendees (user_id, event_id) VALUES (24,8);
INSERT INTO attendees (user_id, event_id) VALUES (25,8);
INSERT INTO attendees (user_id, event_id) VALUES (26,8);
INSERT INTO attendees (user_id, event_id) VALUES (27,8);
INSERT INTO attendees (user_id, event_id) VALUES (50,8);
INSERT INTO attendees (user_id, event_id) VALUES (51,8);
INSERT INTO attendees (user_id, event_id) VALUES (52,8);
INSERT INTO attendees (user_id, event_id) VALUES (53,8);
INSERT INTO attendees (user_id, event_id) VALUES (54,8);
INSERT INTO attendees (user_id, event_id) VALUES (55,8);
INSERT INTO attendees (user_id, event_id) VALUES (56,8);
INSERT INTO attendees (user_id, event_id) VALUES (57,8);
INSERT INTO attendees (user_id, event_id) VALUES (58,8);
INSERT INTO attendees (user_id, event_id) VALUES (59,8);
INSERT INTO attendees (user_id, event_id) VALUES (50,8);
INSERT INTO attendees (user_id, event_id) VALUES (51,8);
INSERT INTO attendees (user_id, event_id) VALUES (52,8);
INSERT INTO attendees (user_id, event_id) VALUES (53,8);
INSERT INTO attendees (user_id, event_id) VALUES (54,8);
INSERT INTO attendees (user_id, event_id) VALUES (55,8);
INSERT INTO attendees (user_id, event_id) VALUES (56,8);
INSERT INTO attendees (user_id, event_id) VALUES (57,8);



