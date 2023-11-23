CREATE TABLE pratica.Cliente  (
	id int identity primary key,
	nome varchar(50) not null,
	email varchar(50) not null unique,
	endereco varchar(50) not null,
	senha text not null,
	urlAvatar text null,
	cargo varchar(15) not null,
)

CREATE TABLE pratica.Produto (
	id int identity primary key,
	criador int foreign key references pratica.Cliente(id),
	nome varchar(150) not null,
	descricao varchar(500) not null,
	urlFoto text null,
	valorMinimo float not null,
)

CREATE TABLE pratica.Leilao (
	id int identity primary key,
	idProduto int not null foreign key references pratica.Produto(id),
	dataInicio datetime not null,
	dataFim datetime not null,
)

CREATE TABLE pratica.Lance (
	id int identity primary key,
	idLeilao int not null foreign key references pratica.Leilao(id),
	idCliente int not null foreign key references pratica.Cliente(id),
	valor float not null,
	atualizadoEm datetime not null default CURRENT_TIMESTAMP,
)

CREATE VIEW pratica.ProdutoCriador AS 
	SELECT p.id, p.nome, p.descricao, p.urlFoto, c.id "id_criador", c.nome "nome_criador", c.urlAvatar "avatar_criador"
		FROM 
		pratica.Produto p 
			inner join pratica.Cliente c 
			on p.criador = c.id 