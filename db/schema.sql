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

-- CREATE TABLE likes (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   game_id INTEGER NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
--   FOREIGN KEY (game_id) REFERENCES GAMES (id) ON DELETE CASCADE
-- );

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  score INTEGER,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES GAMES (id) ON DELETE CASCADE
);

-- comments add score (integer)



-- seeding

INSERT INTO users (username, email, password_digest)
VALUES ('MADV', 'mark@gmail.com', '#12345');

INSERT INTO games (title, image_url, description, genre, platform, release_date)
VALUES ('Cyberpunk 2077', 'https://i1.sndcdn.com/artworks-kb2KdSqUgEytRcfh-VkRYyg-t500x500.jpg', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.', 'Action', 'PC', '2020-12-10');

INSERT INTO user_games (user_id, game_id)
VALUES (1, 1);

INSERT INTO comments (content, score, user_id, game_id)
VALUES ('This game is amazing!', 10, 1, 1);