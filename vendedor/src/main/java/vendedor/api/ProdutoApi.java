package vendedor.api;


import com.google.gson.Gson;

import vendedor.api.models.Produto;
import vendedor.api.models.ResponseInfo;
import vendedor.api.models.ResponseToken;
import vendedor.api.utils.QueryApi;

public class ProdutoApi extends BaseApi {
  protected static String BASE_PATH = "product";

  public static boolean criar(ResponseToken token, Produto produto) {
    try {
      post(BASE_PATH+"/", null, token.getToken(), produto);
      
      return true;
    }
    catch (Exception e) { e.printStackTrace(); return false; }
  }

  public static boolean editar(ResponseToken token, Produto produto) {
    try {
      put(BASE_PATH+"/", null, token.getToken(), produto);
      
      return true;
    }
    catch (Exception e) { return false; }
  }

  public static Produto[] listar(ResponseToken token, ResponseInfo info) {
    try {
      String result = get(BASE_PATH+"/list", new QueryApi[] { new QueryApi("id_vendedor", ""+info.getId()) }, token.getToken());
      
      return new Gson().fromJson(result, Produto[].class);
    }
    catch (Exception e) { return new Produto[] { }; }
  }
  
  public static boolean leiloar(ResponseToken token, int id) {
    try {
      post(BASE_PATH+"/"+id+"/auction", null, token.getToken(), "");
      return true;
    }
    catch (Exception e) { return false; }
  }

  public static boolean deletar(ResponseToken token, int id) {
    try {
      delete(BASE_PATH+"/"+id, null, token.getToken());
      
      return true;
    }
    catch (Exception e) { return false; }
  }

}
