package vendedor.api.models;

import java.util.Map;

import com.google.gson.Gson;

import vendedor.api.utils.IConvertJson;

public class Cliente implements IConvertJson {
    private int id;
    private String nome;
    private String email;
    private String endereco;
    private String senha;
    private String urlAvatar;
    private String cargo;

    public Cliente() {}

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

    public int getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getEndereco() { return endereco; }
    public String getSenha() { return senha; }
    public String getUrlAvatar() { return urlAvatar; }
    public String getCargo() { return cargo; }

    public void setNome(String nome) {
        if(nome == null)
            throw new IllegalArgumentException("nome não pode ser nulo");
        this.nome = nome;
    }
    public void setEmail(String email) {
        if(email == null)
            throw new IllegalArgumentException("email não pode ser nulo");
        this.email = email;
    }
    public void setEndereco(String endereco) {
        if(endereco == null)
            throw new IllegalArgumentException("endereco não pode ser nulo");
        this.endereco = endereco;
    }
    public void setSenha(String senha) {
        if(senha == null)
            throw new IllegalArgumentException("senha não pode ser nulo");
        this.senha = senha;
    }
    public void setUrlAvatar(String urlAvatar) {
        this.urlAvatar = urlAvatar;
    }
    public void setCargo(String cargo) {
        if(cargo == null)
            throw new IllegalArgumentException("cargo não pode ser nulo");
        this.cargo = cargo;
    }

    public String toJson() {
        return new Gson().toJson(this);
    }
}