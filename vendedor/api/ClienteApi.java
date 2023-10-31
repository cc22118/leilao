package api;

import java.io.IOException;
import java.net.*;
import java.net.http.*;

public class ClienteApi {
  public static HttpResponse<String> login(String email, String senha) throws IOException, InterruptedException {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(BaseApi.BASE_URL+"/cliente/login"))
      .POST(HttpRequest.BodyPublishers.ofString(
        String.format(
          "{ \"email\": \"%s\", \"senha\": \"%s\" }",
          email, senha
        )
      ))
      .build();
    
    HttpClient httpClient = HttpClient.newBuilder().build();

    return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
  }
}
