CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    mobile VARCHAR(15),
    email VARCHAR(100),
    is_active BOOLEAN,
    is_blocked BOOLEAN,
    access_token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_id ON users (user_id);
ALTER TABLE users ADD CONSTRAINT unique_email_mobile UNIQUE (email, mobile);
-- unique constarin on mobile and email

CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(50),
    author_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);
CREATE INDEX idx_post_id ON posts (post_id);
CREATE INDEX idx_author_id ON posts (author_id);
CREATE INDEX idx_created_at ON posts (created_at);
-- indexing on post_id, author_id and created_at in posts
