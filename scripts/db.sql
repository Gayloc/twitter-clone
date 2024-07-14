CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Tweets (
    tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    like_count INTEGER DEFAULT 0,
    retweet_count INTEGER DEFAULT 0
);
CREATE TABLE Follows (
    follower_id INTEGER NOT NULL,
    followed_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES Users (user_id),
    FOREIGN KEY (followed_id) REFERENCES Users (user_id)
);
CREATE TABLE Likes (
    user_id INTEGER NOT NULL,
    tweet_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tweet_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (tweet_id) REFERENCES Tweets (tweet_id)
);
CREATE TABLE Retweets (
    user_id INTEGER NOT NULL,
    tweet_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tweet_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (tweet_id) REFERENCES Tweets (tweet_id)
);
CREATE TABLE Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tweet_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tweet_id) REFERENCES Tweets (tweet_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);
CREATE TABLE Media (
    media_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tweet_id INTEGER NOT NULL,
    media_url TEXT NOT NULL,
    media_type TEXT CHECK(media_type IN ('image', 'video')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tweet_id) REFERENCES Tweets (tweet_id)
);

