package vendedor;

import java.util.Scanner;

import vendedor.api.ClienteApi;
import vendedor.api.models.ResponseToken;

public class Cliente {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Digite seu email: ");
            String email = scanner.nextLine();
            System.out.print("Digite sua senha: ");
            String senha = scanner.nextLine();

            ResponseToken token = ClienteApi.login(email, senha);
            System.out.println(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}