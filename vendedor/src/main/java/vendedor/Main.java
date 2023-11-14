package vendedor;

import java.util.Scanner;

import vendedor.api.ClienteApi;
import vendedor.api.models.ResponseInfo;
import vendedor.api.models.Cliente;
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
                    ClienteApi.criarConta(new Cliente(0, nome, email, endereco, senha, null, "vendedor"));
                    token = ClienteApi.login(email, senha);
                    info = ClienteApi.info(token);
                    if(info.getCargo() != "vendedor")
                        throw new Exception("Você não é um vendedor");
                    break;
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    limparConsole();
                    System.out.println("Erro: email já cadastrado, ou algum campo está vazio ou incorreto");
                }
            }

        if(opcao == 2)
            while(true) {
                try {
                    System.out.print("Digite seu email: ");
                    String email = scanner.nextLine();
                    System.out.print("Digite sua senha: ");
                    String senha = scanner.nextLine();
                    token = ClienteApi.login(email, senha);
                    info = ClienteApi.info(token);
                    if(info.getCargo() != "vendedor")
                        throw new Exception("Você não é um vendedor");
                    break;
                } catch (Exception e) {
                    limparConsole();
                    System.out.println("Erro: email ou senha incorretos, ou você não é um vendedor(a)");
                }
            }
        limparConsole();
        System.out.println("Bem vindo "+info.getNome());
        System.out.println("Seu cargo é "+info.getCargo());
    }

    public static void limparConsole() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }
}