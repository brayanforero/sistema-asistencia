-- DELTED DATABASE
DROP DATABASE IF EXISTS asistencias;

-- DATABASE CREATED AND CONFIG

CREATE DATABASE IF NOT EXISTS asistencias
	CHARACTER SET utf8
	COLLATE utf8_general_ci

;
-- TO USING DATABASE
USE asistencias;


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
    isshow BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_workers PRIMARY KEY (id_worker),
    CONSTRAINT uq_workers UNIQUE INDEX (worker_document)
);

-- ADD TO WORKERS FOREIGN KEYS
ALTER TABLE workers ADD CONSTRAINT fk_workers_positions  FOREIGN KEY (id_position)
			REFERENCES positions (id_position)
            ON DELETE RESTRICT ON UPDATE RESTRICT;
-- DESC workers;

-- TABLE JOURNAL
DROP TABLE IF EXISTS journal;
CREATE TABLE IF NOT EXISTS journal (
	id_journal INT UNSIGNED NOT NULL AUTO_INCREMENT,
    created_at DATE NOT NULL,
	is_closed BOOLEAN NOT NULL DEFAULT 1,	
    CONSTRAINT pk_journal PRIMARY KEY (id_journal),
    CONSTRAINT uq_journal UNIQUE INDEX (created_at)
);


DROP TABLE IF EXISTS entrances;
CREATE TABLE IF NOT EXISTS entrances (
	id_entrance INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_journal INT UNSIGNED NOT NULL,
    id_worker INT UNSIGNED NOT NULL,
    is_assist BOOLEAN NOT NULL,
    observation VARCHAR(20) NOT NULL,
    motivo VARCHAR(50) NOT NULL DEFAULT 'n/a',
	time_entrance TIME NOT NULL,
    time_exit TIME NOT NULL DEFAULT '00:00',
    
    CONSTRAINT pk_assists PRIMARY KEY (id_entrance),
    CONSTRAINT uq_assists UNIQUE (id_journal, id_worker)
);

-- ADD TO ENTRANCES FOREIGN KEYS
ALTER TABLE entrances ADD CONSTRAINT fk_entrances_journal  FOREIGN KEY (id_journal)
			REFERENCES journal (id_journal)
            ON DELETE RESTRICT ON UPDATE RESTRICT;
            
ALTER TABLE entrances ADD CONSTRAINT fk_entrances_workers  FOREIGN KEY (id_worker)
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
    CONSTRAINT uq_workers_username UNIQUE INDEX (username),
    CONSTRAINT uq_workers_person UNIQUE INDEX (id_worker)
);
-- ADD TO USERS FOREIGN KEYS
ALTER TABLE users ADD CONSTRAINT fk_users_workers  FOREIGN KEY (id_worker)
			REFERENCES workers (id_worker)
            ON DELETE RESTRICT ON UPDATE RESTRICT;


/*DROP FUNCTION IF EXISTS valid_date_end;
DELIMITER $$
CREATE FUNCTION IF NOT EXISTS valid_date_end(_end TIME) 
RETURNS VARCHAR(9)
BEGIN 
    DECLARE string VARCHAR(9); 
    IF _end = '00:00:00' THEN 
        SET string = 'Por salir';
    ELSE 
        SET string = (SELECT DATE_FORMAT(_end, '%h:%i %p'));
    END IF; 
    RETURN string; 
END $$
DELIMITER ;
*/

SHOW tables;
