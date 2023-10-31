public class Cliente {
    private int id;
    private String nome;
    private String email;
    private String endereco;
    private String senha;
    private String urlAvatar;
    private String cargo;

    public Cliente(
        int id,
        String nome, String email, String endereco, String senha,
        String urlAvatar, String cargo
    ) {
        if(id <= 0)
            throw new IllegalArgumentException("id não pode ser menor ou igual a 0");
        if(nome == null)
            throw new IllegalArgumentException("nome não pode ser nulo");
        if(email == null)
            throw new IllegalArgumentException("nome não pode ser nulo");
        if(endereco == null)
            throw new IllegalArgumentException("nome não pode ser nulo");
        if(senha == null)
            throw new IllegalArgumentException("nome não pode ser nulo");
        if(cargo == null)
            throw new IllegalArgumentException("nome não pode ser nulo");

        this.id = id;
        this.cargo = cargo;
        this.email = email;
        this.endereco = endereco;
    }
}