package vendedor.api.utils;

  public class QueryApi {
    private String key;
    private String value;

    public QueryApi(String key, String value) {
      this.key = key;
      this.value = value;
    }

    public String getKey() { return this.key; }
    public String getValue() { return this.value; }    
  }