/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package supreme;
import java.util.Date;

/**
 *
 * @author admin
 */
public class AisaJson {
    private double price;
    private double price_open;
    private double day_high;
    private double day_low;
    private String options;
    private Date updatedAt;

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public double getDay_high() {
        return day_high;
    }
    public void setDay_high(double day_high) {
        this.day_high = day_high;
    }

    public double getPrice_open() {
        return price_open;
    }
    public void setPrice_open(double price_open) {
        this.price_open = price_open;
    }

    public double getDay_low() {
        return day_low;
    }
    public void setDay_low(double day_low) {
        this.day_low = day_low;
    }

    public String getOptions() {
        return options;
    }
    public void setOptions(String options) {
        this.options = options;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
