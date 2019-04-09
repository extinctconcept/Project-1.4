CREATE TABLE public.persons
(
  person_id     integer    NOT NULL,
  password      varchar	   NOT NULL,
  username      varchar    NOT NULL,
  first_name    varchar    NOT NULL,
  last_name     varchar    NOT NULL,
  email         varchar    NOT NULL,
  phone         integer    NOT NULL,
  city          varchar    NOT NULL,
  state         varchar    NOT NULL,
  zip           integer    NOT NULL,
  CONSTRAINT person_id PRIMARY KEY (person_id),
  CONSTRAINT person_id UNIQUE (person_id)
);

CREATE TABLE public.game
(
  game_id       integer     NOT NULL,
  person_id     integer     NOT NULL,
  title         varchar     NOT NULL,
  player_count  integer,
  art_url       varchar,
  rating        integer,
  availability_id integer,
  CONSTRAINT game_id PRIMARY KEY (game_id),
  CONSTRAINT person_id_fkey FOREIGN KEY (person_id)
	 REFERENCES public.persons (person_id) MATCH FULL
);

CREATE TABLE public.exchange
(
  exchange_id   integer     NOT NULL,
  owner_id      integer     NOT NULL,
  borrower_id   integer     NOT NULL,
  game_id       integer     NOT NULL,
  exchange_date timestamp without time zone,
  return_date   timestamp without time zone,
  CONSTRAINT exchange_id 	  PRIMARY KEY (exchange_id),
  CONSTRAINT owner_id_fkey    FOREIGN KEY (owner_id)
	 REFERENCES public.persons (person_id) MATCH FULL,
  CONSTRAINT borrower_id_fkey FOREIGN KEY (borrower_id)
	 REFERENCES public.persons (person_id) MATCH FULL,
  CONSTRAINT game_id_fkey     FOREIGN KEY (game_id)
	 REFERENCES public.game (game_id) MATCH FULL
);

CREATE TABLE public.game_availability
(
  available integer NOT NULL,
  unavailable integer NOT NULL,
  pending integer NOT NULL
);

