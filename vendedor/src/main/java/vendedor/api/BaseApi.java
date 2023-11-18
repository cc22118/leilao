package vendedor.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.time.Duration;

import vendedor.api.utils.IConvertJson;
import vendedor.api.utils.QueryApi;

public class BaseApi {
  private static Duration TIMEOUT = Duration.ofSeconds(5000);
  protected static String BASE_URL = "http://localhost:3028";

  private static String handleQuery(QueryApi[] query) {
    if(query == null || query.length == 0)
      return "";

    String newQuery = "";
    for(QueryApi q : query) {
      if(newQuery.isEmpty())
        newQuery += q.getKey()+"="+q.getValue();
      else
        newQuery += "&"+q.getKey()+"="+q.getValue();
    }
    return "?"+newQuery;
  }

  static String get(String path, QueryApi[] query, String token) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+path+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("GET");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição GET - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String post(String path, QueryApi[] query, String token, IConvertJson data) throws Exception {
    return post(path, query, token, data.toJson());
  }

  static String post(String path, QueryApi[] query, String token, String data) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+path+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("POST");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.getOutputStream().write(data.getBytes());
    conn.getOutputStream().flush();
    conn.getOutputStream().close();
    conn.connect();

    if(conn.getResponseCode() < 200 && conn.getResponseCode() > 299) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição POST - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String put(String path, QueryApi[] query, String token, IConvertJson data) throws Exception {
    return put(path, query, token, data.toJson());
  }

  static String put(String path, QueryApi[] query, String token, String data) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+path+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("PUT");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.getOutputStream().write(data.getBytes());
    conn.getOutputStream().flush();
    conn.getOutputStream().close();
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição PUT - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String delete(String path, QueryApi[] query, String token) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+path+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("DELETE");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição DELETE - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }
}