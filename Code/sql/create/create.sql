CREATE TABLE persons
(
  person_id     integer    NOT NULL,
  pw            varchar,
  first_name    varchar    NOT NULL,
  last_name     varchar    NOT NULL,
  email         varchar    NOT NULL,
  phone         integer    NOT NULL,
  city          varchar    NOT NULL,
  state         varchar    NOT NULL,
  zip           integer    NOT NULL
  PRIMARY KEY (person_id),
);

CREATE TABLE game
(
  game_id       integer     NOT NULL,
  person_id     integer     NOT NULL,
  title         varchar     NOT NULL,
  player_count  integer,
  art_url       varchar,
  rating        integer,
  availability_id integer,
  PRIMARY KEY (game_id),
  CONSTRAINT person_id_fkey FOREIGN KEY (person_id)
);

CREATE TABLE exchange
(
  exchange_id   integer     NOT NULL,
  owner_id      integer     NOT NULL,
  borrower_id   integer     NOT NULL,
  game_id       integer     NOT NULL,
  exchange_date timestamp without time zone,
  return_date   timestamp without time zone,
  PRIMARY KEY (exchange_id),
  CONSTRAINT owner_id_fkey    FOREIGN KEY (person_id)
  CONSTRAINT borrower_id_fkey FOREIGN KEY (person_id)
  CONSTRAINT game_id_fkey     FOREIGN KEY (game_id)
);

CREATE TABLE game_availability
(
  available integer NOT NULL,
  unavailable integer NOT NULL,
  pending integer NOT NULL
);
