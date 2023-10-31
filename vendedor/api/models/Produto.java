package api.models;

public class Produto {
  private int id;
  private int criador;
  private String nome;
  private String descricao;
  private String urlFoto;
  private double valorMinimo;

  public Produto(
    int id, int criador, String nome, String descricao, String urlFoto, double valorMinimo
  ) {
    if(id <= 0)
      throw new IllegalArgumentException("id não pode ser menor ou igual a 0");
    if(criador <= 0)
      throw new IllegalArgumentException("criador não pode ser menor ou igual a 0");
    if(nome == null)
      throw new IllegalArgumentException("nome não pode ser nulo");
    if(descricao == null)
      throw new IllegalArgumentException("descricao não pode ser nulo");
    if(valorMinimo < 0)
      throw new IllegalArgumentException("valorMinimo não pode ser menor ou igual a 0");

    this.id = id;
    this.criador = criador;
    this.nome = nome;
    this.descricao = descricao;
    this.urlFoto = urlFoto;
    this.valorMinimo = valorMinimo;
  }

  public int getId() { return id; }
  public int getCriador() { return criador; }
  public String getNome() { return nome; }
  public String getDescricao() { return descricao; }
  public String getUrlFoto() { return urlFoto; }
  public double getValorMinimo() { return valorMinimo; }

  public void setNome(String nome) {
    if(nome == null)
      throw new IllegalArgumentException("nome não pode ser nulo");
    this.nome = nome;
  }
  public void setDescricao(String descricao) {
    if(descricao == null)
      throw new IllegalArgumentException("descricao não pode ser nulo");
    this.descricao = descricao;
  }
  public void setUrlFoto(String urlFoto) {
    this.urlFoto = urlFoto;
  }
  public void setValorMinimo(double valorMinimo) {
    if(valorMinimo < 0)
      throw new IllegalArgumentException("valorMinimo não pode ser menor ou igual a 0");
    this.valorMinimo = valorMinimo;
  }
}