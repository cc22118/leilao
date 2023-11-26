package vendedor;

import java.util.Scanner;

import vendedor.api.ClienteApi;
import vendedor.api.ProdutoApi;
import vendedor.api.models.ResponseInfo;
import vendedor.api.models.Cliente;
import vendedor.api.models.Leilao;
import vendedor.api.models.Produto;
import vendedor.api.models.ResponseToken;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ResponseToken token = null;
        ResponseInfo info = null;
        System.out.println("Bem vindo ao sistema de leilão");
        System.out.println("Você deseja criar uma conta ou fazer login?");
        System.out.println("1 - Criar conta");
        System.out.println("2 - Fazer login");
        System.out.print("Digite sua opção: ");
        int opcao = scanner.nextInt();
        scanner.nextLine();

        if(opcao == 1)
            while(true) {
                try {
                    System.out.print("Digite seu nome: ");
                    String nome = scanner.nextLine();
                    System.out.print("Digite seu email: ");
                    String email = scanner.nextLine();
                    System.out.print("Endereço: ");
                    String endereco = scanner.nextLine();
                    System.out.print("Digite sua senha: ");
                    String senha = scanner.nextLine();
                    ClienteApi.criarConta(new Cliente(1, nome, email, endereco, senha, null, "vendedor"));
                    token = ClienteApi.login(email, senha);
                    info = ClienteApi.info(token);
                    if(!info.getCargo().equals("vendedor"))
                        throw new Exception("Você não é um vendedor");
                    break;
                } catch (Exception e) {
                    limparConsole();
                    System.out.println("Erro: email já cadastrado, ou algum campo está vazio ou incorreto");
                }
            }
        else if(opcao == 2)
            while(true) {
                try {
                    System.out.print("Digite seu email: ");
                    String email = scanner.nextLine();
                    System.out.print("Digite sua senha: ");
                    String senha = scanner.nextLine();
                    token = ClienteApi.login(email, senha);
                    info = ClienteApi.info(token);
                    if(!info.getCargo().equals("vendedor"))
                        throw new Exception("Você não é um vendedor");
                    break;
                } catch (Exception e) {
                    limparConsole();
                    System.out.println("Erro: email ou senha incorretos, ou você não é um vendedor(a)");
                }
            }
            else {
                System.out.println("Opção inválida");
                System.exit(0);
            }
        while (true) {
            limparConsole();
            System.out.println("Bem vindo "+info.getNome());
            System.out.println("Seu cargo é "+info.getCargo());
            System.out.println("O que você deseja fazer?");
            System.out.println("1 - Cadastrar produto");
            System.out.println("2 - Listar produtos");
            System.out.println("3 - Editar produto");
            System.out.println("4 - Leiloar produto");
            System.out.println("3 - Deletar produto");
            System.out.println("0 - Sair");
            System.out.print("Digite sua opção: ");
            opcao = scanner.nextInt();
            scanner.nextLine();
            limparConsole();
            do {
                switch(opcao) {
                    case 1:
                        System.out.print("Digite o nome do produto: ");
                        String nome = scanner.nextLine();
                        System.out.print("Digite a descrição do produto: ");
                        String descricao = scanner.nextLine();
                        System.out.print("Digite a url da foto do produto: ");
                        String urlFoto = scanner.nextLine();
                        System.out.print("Digite o valor mínimo do produto: ");
                        double valorMinimo = scanner.nextDouble();
                        scanner.nextLine();
                        if(nome.equals("") || descricao.equals("") || urlFoto.equals("") || valorMinimo == 0) {
                            System.out.println("Erro: algum campo está vazio");
                            continue;
                        }
                        boolean result = ProdutoApi.criar(token, new Produto(1, info.getId(), nome, descricao, urlFoto, valorMinimo));
                        
                        if(!result) {
                            System.out.println("Erro ao cadastrar produto");
                            continue;
                        }
                        
                        limparConsole();
                        System.out.println("Produto cadastrado com sucesso");
                        opcao = -1;
                        break;

                    case 2:
                        System.out.println("Produtos cadastrados:");
                        for(Produto produto : ProdutoApi.listar(token, info))
                            System.out.println(produto);
                        System.out.println("Aperte qualquer tecla para continuar [↵]");
                        scanner.nextLine();
                        opcao = -1;
                        break;
                    case 3:
                        System.out.print("Digite o id do produto que deseja editar: ");
                        int id = scanner.nextInt();
                        scanner.nextLine();
                        Produto produto = ProdutoApi.buscar(token, id);
                        if(produto == null) {
                            limparConsole();
                            System.out.println("Produto não encontrado");
                            continue;
                        }
                        System.out.println("Produto encontrado:");
                        System.out.print("Digite o novo nome do produto: ["+produto.getNome()+"]");
                        nome = scanner.nextLine();
                        System.out.print("Digite a nova descrição do produto: ["+produto.getDescricao()+"]");
                        descricao = scanner.nextLine();
                        System.out.print("Digite a nova url da foto do produto: ["+produto.getUrlFoto()+"]");
                        urlFoto = scanner.nextLine();
                        System.out.print("Digite o novo valor mínimo do produto: ["+produto.getValorMinimo()+"]");
                        try {
                            valorMinimo = Double.parseDouble(scanner.nextLine());
                        } catch (Exception e) {
                            valorMinimo = 0;
                        }
                        produto.setNome(nome.equals("") ? produto.getNome() : nome);
                        produto.setDescricao(descricao.equals("") ? produto.getDescricao() : descricao);
                        produto.setUrlFoto(urlFoto.equals("") ? produto.getUrlFoto() : urlFoto);
                        produto.setValorMinimo(valorMinimo == 0 ? produto.getValorMinimo() : valorMinimo);
                        result = ProdutoApi.editar(token, produto);
                        
                        if(!result) {
                            System.out.println("Erro ao editar produto");
                            continue;
                        }
                        
                        limparConsole();
                        System.out.println("Produto editado com sucesso");
                        opcao = -1;
                        break;
                    case 4:
                        System.out.print("Digite o id do produto que deseja leiloar: ");
                        id = scanner.nextInt();
                        scanner.nextLine();
                        System.out.print("Digite o dia que inicia o leilão: [mm-dd-aaaa] ");
                        String dataInicio = scanner.nextLine();
                        System.out.print("Digite o dia que termina o leilão: [mm-dd-aaaa] ");
                        String dataFim = scanner.nextLine();
                        result = ProdutoApi.leiloar(token, new Leilao(1, id, dataInicio, dataFim));
                        
                        if(!result) {
                            System.out.println("Erro ao leiloar produto");
                            continue;
                        }
                        
                        limparConsole();
                        System.out.println("Produto leiloado com sucesso");
                        opcao = -1;
                        break;
                    case 5:
                        System.out.print("Digite o id do produto que deseja deletar: ");
                        id = scanner.nextInt();
                        scanner.nextLine();
                        result = ProdutoApi.deletar(token, id);
                        
                        if(!result) {
                            System.out.println("Erro ao deletar produto");
                            continue;
                        }
                        
                        limparConsole();
                        System.out.println("Produto deletado com sucesso");
                        opcao = -1;
                        break;
                    case 0:
                        System.out.println("Até mais "+info.getNome());
                        System.exit(0);
                        break;
                    default:
                        System.out.println("\n\nOpção inválida\n");
                        System.out.println("Aperte qualquer tecla para continuar [↵]");
                        scanner.nextLine();
                        opcao = -1;
                        break;
                }
            } while(opcao > 0);
        }
    }

    public static void limparConsole() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }
}