create table usuario(
	id int primary key auto_increment,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    celular varchar(12) not null,
    email varchar(120) not null,
    password varchar(255) not null,
    google tinyint,
    verificado tinyint default 0,
    codigo_verificacion int,
    id_rol int not null,
    foreign key (id_rol) references rol(id)
);

create table rol(
	id int primary key auto_increment,
	rol varchar(20)
)