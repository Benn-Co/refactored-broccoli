/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package supreme;
import java.util.List;
import com.google.gson.Gson;
/**
 *
 * @author admin
 */
public class TestJson {
    public static class Data {
        private List<String> title;
        public List<String> getTitle() {return title;}
        public Data() {}
    }
    
    public static void main (String [] args) {
        Gson gson = new Gson();
        Data data = gson.fromJson("price=48230.33&price_open=48189.95&day_high=48245.18&day_low=48189.06&options=buy&assest=undefined", Data.class);
        System.out.println(data.getTitle());
    }
}
