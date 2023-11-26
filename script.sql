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

CREATE TRIGGER tr_AutomaticUpdateLance
ON pratica.Lance
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    IF (SELECT COUNT(*) FROM deleted) > 0
    BEGIN
        RAISERROR('Não é permitido excluir registros da tabela pratica.Lance.', 16, 1);
        ROLLBACK;
        RETURN;
    END

    IF (SELECT COUNT(*) FROM inserted) > 0 AND (SELECT COUNT(*) FROM deleted) > 0
    BEGIN
        RAISERROR('Não é permitido atualizar registros na tabela pratica.Lance.', 16, 1);
        ROLLBACK;
        RETURN;
    END

    IF (SELECT COUNT(*) FROM inserted) > 0
    BEGIN
        UPDATE pratica.Lance
        SET atualizadoEm = CURRENT_TIMESTAMP
        FROM pratica.Lance l
        INNER JOIN inserted i ON l.id = i.id;
    END
END;

CREATE TRIGGER tr_CheckLeilaoAberto
ON pratica.Lance
AFTER INSERT
AS
BEGIN
    DECLARE @LeilaoID INT;
    DECLARE @DataAtual DATETIME;

    SELECT @LeilaoID = inserted.idLeilao,
           @DataAtual = GETDATE()
    FROM inserted;

    DECLARE @DataInicio DATETIME;
    DECLARE @DataFim DATETIME;

    SELECT @DataInicio = l.dataInicio,
           @DataFim = l.dataFim
    FROM pratica.Leilao l
    WHERE l.id = @LeilaoID;

    IF @DataAtual < @DataInicio OR @DataAtual > @DataFim
    BEGIN
        RAISERROR('O leilão não está aberto para novos lances.', 16, 1);
        ROLLBACK;
    END
END;

CREATE TRIGGER tr_CheckLance
ON pratica.Lance
AFTER INSERT
AS
BEGIN
    DECLARE @ProdutoID INT;
    DECLARE @LanceValor FLOAT;

    SELECT @ProdutoID = inserted.idLeilao,
           @LanceValor = inserted.valor
    FROM inserted;

    DECLARE @ValorMinimo FLOAT;

    SELECT @ValorMinimo = p.valorMinimo
    FROM pratica.Leilao l
    INNER JOIN pratica.Produto p ON l.idProduto = p.id
    WHERE l.id = @ProdutoID;

    IF @LanceValor < @ValorMinimo
    BEGIN
        RAISERROR('O valor do lance deve ser maior ou igual ao valor mínimo do produto.', 16, 1);
        ROLLBACK;
    END
END;

CREATE VIEW pratica.LancesLeilao AS
    SELECT l.id, l.idLeilao, l.idCliente, l.valor, l.atualizadoEm, 
           c.nome AS nomeCliente, c.urlAvatar AS avatarCliente
    FROM pratica.Lance l
    INNER JOIN pratica.Cliente c ON l.idCliente = c.id;


CREATE View pratica.LeiaoProduto AS
	select l.id "idLeilao", p.id "idProduto", l.dataInicio, l.dataFim, p.criador, p.nome, p.descricao, p.urlFoto, p.valorMinimo
		FROM 
			pratica.Leilao l inner join pratica.Produto p
			on p.id = l.idProduto

CREATE VIEW pratica.ProdutoCriador AS 
	SELECT p.id, p.nome, p.descricao, p.urlFoto, c.id "id_criador", c.nome "nome_criador", c.urlAvatar "avatar_criador"
		FROM 
		pratica.Produto p 
			inner join pratica.Cliente c 
			on p.criador = c.id 