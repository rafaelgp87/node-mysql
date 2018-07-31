CREATE DATABASE IF NOT EXISTS proyecto;
SET default_storage_engine = INNODB;

# drop table if exists proyecto.usuarios
create table if not exists proyecto.usuarios (
	num serial,
	id binary(16) not null,
    fecha_registro datetime not null,
    email varchar(255) not null,
	usuario varchar(255) null,
	referencia varchar(255),
	nombres varchar(255) null,
    apellidos varchar(255) null,
	genero varchar(20) null,
	fecha_nacimiento  date null,
	foto varchar(255) null,
	token varchar(30) null,
	activo boolean null,
    PRIMARY KEY (id),
    INDEX num_user (num)
) engine = InnoDB;

/*
select num,
	   BIN_TO_UUID(id) as id, 
	   fecha_registro, 
	   email, 
	   usuario, 
	   referencia, 
	   nombres, 
       apellidos, 
       genero, 
	   fecha_nacimiento, 
       foto, 
       token, 
       activo
  from proyecto.usuarios
  
delete from proyecto.usuarios where id = UUID_TO_BIN('a67d1b92-9436-11e8-a6df-94de801ecc15');
*/

use proyecto;

# drop table if exists proyecto.listas
create table if not exists proyecto.listas (
   num serial,
   id binary(16) not null,
   id_user binary(16) not null,
   fecha_registro datetime not null,
   nombre varchar(255) null,
   INDEX num_user (num),
   PRIMARY KEY (id),
   FOREIGN KEY fk_user_lista(id_user) REFERENCES proyecto.usuarios(id) ON DELETE CASCADE
) engine = InnoDB;

/*
insert into proyecto.listas (id, id_user, fecha_registro, nombre)
values (UUID_TO_BIN(UUID()), UUID_TO_BIN('5b859712-9465-11e8-adc0-2ccd7f17f68a'), now(), 'Lista de pruebas 5');

select num, BIN_TO_UUID(id), BIN_TO_UUID(id_user), fecha_registro, nombre from proyecto.listas;
*/
# drop table if exists proyecto.lista_item
create table if not exists proyecto.lista_item (
   num serial,
   id binary(16) not null,
   id_lista binary(16) not null,
   fecha_registro datetime not null,
   nombre varchar(255) null,
   descripcion text null,
   url varchar(255) null,
   INDEX num_user (num),
   PRIMARY KEY (id),
   FOREIGN KEY fk_lista_item(id_lista) REFERENCES proyecto.listas(id) ON DELETE CASCADE
) engine = InnoDB;

/*
insert into proyecto.lista_item (id, id_lista, fecha_registro, nombre, descripcion, url)
values (UUID_TO_BIN(UUID()), UUID_TO_BIN('c20666af-9449-11e8-a6df-94de801ecc15'), now(), 'Item de pruebas', 'Este es un elemento de pruebas para una lista', 'https://www.google.com');

select num, BIN_TO_UUID(id), BIN_TO_UUID(id_lista), fecha_registro, nombre, descripcion, url from proyecto.lista_item;
*/

# drop table if exists proyecto.social_media
create table if not exists proyecto.social_media (
  num serial,
  id binary(16) not null,
  nombre varchar(255) null,
  icon varchar(255) null,
  INDEX num_user (num),
  PRIMARY KEY (id)
) engine = InnoDB;

# drop table if exists proyecto.usurio_social_media
create table if not exists proyecto.usurio_social_media (
  num serial,
  id_user binary(16) not null,
  id_social_media binary(16) not null,
  INDEX num_user (num),
  FOREIGN KEY fk_user_social_media1(id_user) REFERENCES proyecto.usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY fk_user_social_media2(id_social_media) REFERENCES proyecto.social_media(id) ON DELETE CASCADE
) engine = InnoDB;

