# ArtBind
ArtBid é uma plataforma de leilão online que preza a comunicação virtual e eficiente
entre vendedor e cliente. Com propósito de ajudar a carreira de pequenos artistas que
terão um site onde poderão anunciar suas obras, dando visibilidade para eles e
gerando oportunidade de “barganha” entre os clientes que podem conversar com o
vendedor e/ou fazerem lances, caso haja grande disputa entre um produto.

- **Objetvo:**
    O objetivo do projeto é dar visibilidade a artistas pequenos e/ou independentes, para
    poderem anunciar seus produtos em um site já destinado aos amantes de arte e
    cultura, que podem acessar o ambiente virtual já com o propósito de encontrar artes
    únicas e apoiar artistas.

# SQL
```sql
CREATE TABLE pratica.Cliente  (
	id int identity primary key,
	nome varchar(50) not null,
	email varchar(50) not null,
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

CREATE TABLE pratica.Lances (
	id int identity primary key,
	idLeilao int not null foreign key references pratica.Leilao(id),
	idCliente int not null foreign key references pratica.Cliente(id),
	valor float not null,
	atualizadoEm datetime not null default CURRENT_TIMESTAMP,
)
```