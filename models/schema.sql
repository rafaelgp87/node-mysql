CREATE DATABASE IF NOT EXISTS proyecto;
SET default_storage_engine = INNODB;

#drop table if exists proyecto.usuarios

create table if not exists proyecto.usuarios(
	id                serial primary key,
    email             varchar(255),
	usuario           varchar(255) null,
	referencia        varchar(255),
	nombres           varchar(255) null,
    apellidos         varchar(255) null,
	genero        	  varchar(20) null,
	fecha_nacimiento  date null,
	foto              varchar(255) null,
	token             varchar(30) null,
	activo            boolean null,
	licencia          varchar(50) null
) engine=InnoDB;

/*
insert into proyecto.usuarios
       (usuario, referencia,  nombres,  apellidos,                 email,      genero, fecha_nacimiento, foto, token, activo,            licencia)
values ( 'rafa',    '入ります', 'Rafael','Gutierrez','rafaelgp87@gmail.com', 'Masculino',     '1987-08-06', null,  null,   true,'licencia de prueba')
select * from proyecto.usuarios

select * from proyecto.usuarios where email = 'rafaelgp87@gmail.com' and referencia = 'cisco' and activo = 1;
delete from proyecto.usuarios where id = 6
*/

#drop table profesores.teacher;
#drop table profesores.course;
/*
use profesores;

create table profesores.teacher(
   id_teacher  int not null auto_increment primary key,
   name        varchar(255),
   avatar      varchar(255)
) engine=InnoDB;

create table profesores.course(
   id_course int not null auto_increment primary key,
   name           varchar(255),
   themes         text null,
   project        varchar(255) null,
   id_teacher     int not null,
   foreign key fk_teacher(id_teacher) references profesores.teacher(id_teacher)
) engine=InnoDB;
create table profesores.social_media(
   id_social_media  int not null auto_increment primary key,
   name             varchar(255),
   icon             varchar(255)
) engine=InnoDB;
create table profesores.teacher_social_media(
   id_teacher_social_media  int not null auto_increment primary key,
   id_teacher               int not null,
   foreign key fk_teacher(id_teacher) references profesores.teacher(id_teacher),
   id_social_media          int not null,
   foreign key fk_social_media(id_social_media) references profesores.social_media(id_social_media)
) engine=InnoDB;


select * from profesores.teacher;
select * from profesores.course;
select * from profesores.social_media;
select * from profesores.teacher_social_media;
*/
