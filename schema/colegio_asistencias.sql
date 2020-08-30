-- DATABASE CREATED AND CONFIG

CREATE DATABASE IF NOT EXISTS colegio_asistencias
	CHARACTER SET utf8
	COLLATE utf8_general_ci
;
-- TO USING DATABASE
USE colegio_asistencias;
-- DELTED DATABASE
DROP DATABASE IF EXISTS colegio_asistencias;

-- TABLE POSITION
DROP TABLE IF EXISTS positions;

CREATE TABLE IF NOT EXISTS positions (
	id_position INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    
    CONSTRAINT pk_positions PRIMARY KEY (id_position)
);

-- TABLE PERSONS

DROP TABLE IF EXISTS workers;

CREATE TABLE IF NOT EXISTS workers (
	
    id_worker INT UNSIGNED NOT NULL AUTO_INCREMENT,
    worker_document VARCHAR(12) NOT NULL,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    id_position INT UNSIGNED NOT NULL, 
    state BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_workers PRIMARY KEY (id_worker),
    CONSTRAINT uq_workers UNIQUE INDEX (worker_document)
);

-- ADD TO WORKERS FOREIGN KEYS
ALTER TABLE workers ADD CONSTRAINT fk_workers_positions  FOREIGN KEY (id_position)
			REFERENCES positions (id_position)
            ON DELETE RESTRICT ON UPDATE RESTRICT;
DESC workers;

-- TABLE JOURNAL
DROP TABLE IF EXISTS journal;
CREATE TABLE IF NOT EXISTS journal (
	id_journal INT UNSIGNED NOT NULL AUTO_INCREMENT,
    date_day SMALLINT UNSIGNED NOT NULL,
    date_month SMALLINT UNSIGNED NOT NULL,
    date_year INT UNSIGNED NOT NULL,
    
    CONSTRAINT pk_journal PRIMARY KEY (id_journal),
    CONSTRAINT uq_journal UNIQUE INDEX (date_day, date_month, date_year)
);

DESC journal;

DROP TABLE IF EXISTS assists;
CREATE TABLE IF NOT EXISTS assists (
	id_assists INT UNSIGNED NOT NULL,
    id_journal INT UNSIGNED NOT NULL,
    id_worker INT UNSIGNED NOT NULL,
    is_assist BOOLEAN NOT NULL,
    observation VARCHAR(20) NOT NULL,
    
    CONSTRAINT pk_assists PRIMARY KEY (id_assists),
    CONSTRAINT uq_assists UNIQUE (id_journal, id_worker)
);

-- ADD TO ASSISTS FOREIGN KEYS
ALTER TABLE assists ADD CONSTRAINT fk_assists_journal  FOREIGN KEY (id_journal)
			REFERENCES journal (id_journal)
            ON DELETE RESTRICT ON UPDATE RESTRICT;
            
ALTER TABLE assists ADD CONSTRAINT fk_assists_workers  FOREIGN KEY (id_worker)
			REFERENCES workers (id_worker)
            ON DELETE RESTRICT ON UPDATE RESTRICT;

-- TABLE USERS
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id_user INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_worker INT UNSIGNED NOT NULL,
    username VARCHAR(12) NOT NULL,
    password VARCHAR(300) NOT NULL,
    is_habilited BOOLEAN  NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pk_workers PRIMARY KEY (id_user),
    CONSTRAINT uq_workers UNIQUE INDEX (username)
);
-- ADD TO USERS FOREIGN KEYS
ALTER TABLE users ADD CONSTRAINT fk_users_workers  FOREIGN KEY (id_worker)
			REFERENCES workers (id_worker)
            ON DELETE RESTRICT ON UPDATE RESTRICT;
