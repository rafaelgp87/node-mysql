create database if not exists listas;
set default_storage_engine = InnoDB;

use listas;

# drop table if exists listas.listas
create table if not exists listas.listas (
   num serial,
   id binary(16) not null,
   id_user binary(16) not null,
   fecha_registro datetime not null,
   nombre varchar(255) null,
   index num_user (num),
   primary key (id),
   foreign key fk_user_lista(id_user) references usuarios.usuarios(id) on delete cascade
) engine = InnoDB;

/*
insert into listas.listas (id, id_user, fecha_registro, nombre)
values (UUID_TO_BIN(UUID()), UUID_TO_BIN('dda4893e-9dd3-11e8-ae46-df1df2652486'), now(), 'Música');

select num, BIN_TO_UUID(id), BIN_TO_UUID(id_user), fecha_registro, nombre from listas.listas;
*/

# drop table if exists listas.item
create table if not exists listas.item (
   num serial,
   id binary(16) not null,
   id_lista binary(16) not null,
   fecha_registro datetime not null,
   nombre varchar(255) null,
   descripcion text null,
   url varchar(255) null,
   index num_user (num),
   primary key(id),
   foreign key fk_lista_item(id_lista) references listas.listas(id) on delete cascade
) engine = InnoDB;

/*
insert into listas.item (id, id_lista, fecha_registro, nombre, descripcion, url)
values (UUID_TO_BIN(UUID()), UUID_TO_BIN('978ee99c-9dd5-11e8-ae46-df1df2652486'), now(), 'Spaceballs', 'parodía de star wars', 'https://www.imdb.com/title/tt0094012/');

select num, BIN_TO_UUID(id), BIN_TO_UUID(id_lista), fecha_registro, nombre, descripcion, url from listas.item;
*/
