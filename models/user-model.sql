create database if not exists usuarios;
set default_storage_engine = InnoDB;

use usuarios;

# drop table if exists usuarios.usuarios
create table if not exists usuarios.usuarios (
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
    primary key (id),
    index num_user (num)
) engine = InnoDB;

select  num,
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
  from  usuarios.usuarios;
  
# delete from usuarios.usuarios where id = UUID_TO_BIN('a67d1b92-9436-11e8-a6df-94de801ecc15');

# drop table if exists listas.social_media
create table if not exists usuarios.social_media (
  num serial,
  id binary(16) not null,
  nombre varchar(255) null,
  icon varchar(255) null,
  index num_user (num),
  PRIMARY KEY (id)
) engine = InnoDB;

# drop table if exists listas.usurio_social_media
create table if not exists usuarios.usurio_social_media (
  num serial,
  id_user binary(16) not null,
  id_social_media binary(16) not null,
  index num_user (num),
  foreign key fk_user_social_media1(id_user) references usuarios.usuarios(id) on delete cascade,
  foreign key fk_user_social_media2(id_social_media) references usuarios.social_media(id) on delete cascade
) engine = InnoDB;

