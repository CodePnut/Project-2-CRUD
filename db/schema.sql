-- data modelling
-- define the schema of the database
-- SQL

CREATE DATABASE gaming_platform;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  description TEXT,
  genre TEXT,
  platform TEXT,
  release_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_games (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES GAMES (id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  user_id INTEGER,
  game_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES GAMES (id) ON DELETE CASCADE
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  game_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE
);


-- seeding

INSERT INTO users (username, email, password_digest)
VALUES ('MADV', 'mark@gmail.com', '#12345');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Cyberpunk 2077', 'https://i1.sndcdn.com/artworks-kb2KdSqUgEytRcfh-VkRYyg-t500x500.jpg', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.', 'Action', 'PC', '2020-12-10');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('The Witcher 3: Wild Hunt', 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png', 'The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.', 'RPG', 'PC', '2015-05-19');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Red Dead Redemption 2', 'https://i.redd.it/which-cover-art-do-you-prefer-v0-5jhtn3wyuvcc1.jpg?width=1600&format=pjpg&auto=webp&s=460f23db1c95e60b64070d71000b3c12b3d39ae2', 'America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.', 'Action', 'PC', '2018-10-26');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Grand Theft Auto V', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvowizhNsn3o0v511YFzusp0G1BIWUr5nbzGimWWqfw&s', 'Los Santos: a sprawling sun-soaked metropolis full of self-help gurus, starlets and fading celebrities, once the envy of the Western world, now struggling to stay afloat in an era of economic uncertainty and cheap reality TV. Amidst the turmoil, three very different criminals plot their own chances of survival and success: Franklin, a street hustler looking for real opportunities and serious money; Michael, a professional ex-con whose retirement is a lot less rosy than he hoped it would be; and Trevor, a violent maniac driven by the chance of a cheap high and the next big score. Running out of options, the crew risks everything in a series of daring and dangerous heists that could set them up for life.', 'Action', 'PC', '2013-09-17');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('The Elder Scrolls V: Skyrim', 'https://assets-prd.ignimgs.com/2021/08/19/elder-scrolls-skyrim-button-2017-1629409446732.jpg', 'The Elder Scrolls V: Skyrim is an open-world action role-playing game developed by Bethesda Game Studios. It is the fifth main installment in The Elder Scrolls series, following The Elder Scrolls IV: Oblivion, and was released worldwide for Microsoft Windows, PlayStation 3, and Xbox 360 on November 11, 2011.', 'RPG', 'PC', '2011-11-11');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('The Legend of Zelda: Breath of the Wild', 'https://sm.ign.com/ign_ap/cover/t/the-legend/the-legend-of-zelda-hd_mn3p.jpg', 'The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo, released for the Nintendo Switch and Wii U consoles on March 3, 2017. Breath of the Wild is set at the end of the Zelda timeline; the player controls Link, who awakens from a hundred-year slumber to defeat Calamity Ganon and save the kingdom of Hyrule.', 'Action', 'Nintendo Switch', '2017-03-03');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Super Mario Odyssey', 'https://assets1.ignimgs.com/2017/09/01/super-mario-odyssey-button-fin-1504225715322.jpg?width=300&crop=1%3A1%2Csmart&auto=webp', 'Super Mario Odyssey is a platform game developed and published by Nintendo for the Nintendo Switch. An installment in the Super Mario series, the story follows Mario and Cappy, a spirit that possesses Mario''s hat and allows him to take control of other characters and objects, as they set out on a journey across various worlds to save Princess Peach from his nemesis Bowser, who plans to forcibly marry her.', 'Platformer', 'Nintendo Switch', '2017-10-27');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Halo Infinite', 'https://content.halocdn.com/media/Default/community/InfiniteCoverArt/halo_infinite_keyart_primary_square-aecb24a8f2a649e4bdec3f424373fed2.png', 'Halo Infinite is an upcoming first-person shooter game developed by 343 Industries and published by Xbox Game Studios. It will be the sixth main entry in the Halo series, and the fourteenth game overall. The game is set to be released in late 2021 for Microsoft Windows, Xbox One, and Xbox Series X/S.', 'Shooter', 'Xbox Series X', '2021-12-08');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Forza Horizon 5', 'https://assets-prd.ignimgs.com/2021/08/24/forza-horizon-5-button-fin-1629830068379.jpg', 'Forza Horizon 5 is an upcoming open-world racing video game developed by Playground Games and published by Xbox Game Studios. It is the fifth instalment in the Forza Horizon series and the eleventh instalment in the Forza series. The game is set in Mexico and will be released on November 9, 2021, for Microsoft Windows, Xbox One, and Xbox Series X/S.', 'Racing', 'Xbox Series X', '2021-11-09');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('God of War', 'https://cdn.mobygames.com/covers/6194621-god-of-war-playstation-4-front-cover.jpg', 'God of War is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. Released on April 20, 2018, for the PlayStation 4 (PS4), it is the eighth instalment in the God of War series, the eighth chronologically, and the sequel to 2010''s God of War III.', 'Action', 'PlayStation 4', '2018-04-20');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('The Last of Us Part II', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png', 'The Last of Us Part II is a 2020 action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment for the PlayStation 4. Set five years after The Last of Us (2013), players control two characters in a post-apocalyptic United States whose lives intertwine: Ellie, who sets out for revenge after suffering a tragedy, and Abby, a soldier who becomes involved in a conflict with a cult.', 'Action', 'PlayStation 4', '2020-06-19');



INSERT INTO user_games (user_id, game_id)
VALUES (1, 1);

INSERT INTO comments (content, score, user_id, game_id)
VALUES ('This game is amazing!', 10, 1, 1);

-- CREATE TABLE likes (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   game_id INTEGER NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
--   FOREIGN KEY (game_id) REFERENCES GAMES (id) ON DELETE CASCADE
-- );