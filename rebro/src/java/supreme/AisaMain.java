/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package supreme;

import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.filters.unsupervised.attribute.Remove;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.internal.*;

import java.io.*;
import java.util.*;
import java.util.Date;


/**
 * Stock analysis using benn_co.ai
 *
 * <p/>
 * 
 *
 * @author Karitu Pavilion
 *
 * Copyright 2019 @author Karitu . All rights reserved.
 * <p/>
 * This software is can be used under either of the following licenses:
 * <p/>
 * 1. LGPL v3<br/>
 * 2. Apache 2
 * <p/>
 */
public class AisaMain {
    public static double percent_change_since_open = 0.2;
    public static double percent_change_from_day_low = 0.4;
    public static double percent_change_from_day_high =0.1;

    static double mkt_price = 0.0;
    static double mkt_price_open = 0.0;
    static double mkt_day_high= 0.0;
    static double mkt_day_low= 0.0;
    static String mkt_options = "";
    
    static String mkt_json = "";
    
    static String file_path = "C:/Users/admin/OneDrive/Documents/GitHub/refactored-broccoli/"; 
    static String stock_training = "stock_training_data.arff";
    static String stock_data = "stock_data.arff";    

    private static String price_open;
    private static String price;
    private static String options;    
    private static String given_value = "option";
    private static String predicted_value ="AI option";
    
    public static String getGiven_value(){
        return given_value;
    }
    public void setGiven_value(String given_value){
        this.given_value = given_value;
    }

    public static String getPredicted_value(){
        return predicted_value;
    }
    public void setPredicted_value(String predicted_value){
        this.predicted_value = predicted_value;
    }

    public void setStock_training(String stock_training){
        this.stock_training = stock_training;
    }
    

    public static Double gambler(Double q, int z){
        /**double p = 1.0 - q;
        double lambda = z * (q / p);
        double sum = 1.0;
        int i, k;
        for (k = 0; k <= z; k++) {
            double poisson = exp(-lambda);
            for (i = 1; i <= k; i++) poisson *= lambda / i;
            sum -= poisson * (1 - pow(q / p, z - k));
        }*/
        return 2.4;
    }

    public void setJson(String json){
        try {
            // create a writer
            BufferedWriter bw = new BufferedWriter(new FileWriter(file_path + "data.json"));
            // write json to file
            bw.write(json);
            // close the writer
            bw.close();
            readJson();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    };

    public void readJson(){
        try{
            // create a reader
            FileReader reader = new FileReader(file_path + "data.json");
            //create JsonObject instance
            JsonObject parser = JsonParser.parseReader(reader).getAsJsonObject();
            mkt_price = parser.get("price").getAsDouble();
            mkt_price_open = parser.get("price_open").getAsDouble();
            mkt_day_high = parser.get("day_high").getAsDouble();
            mkt_day_low = parser.get("day_low").getAsDouble();
            mkt_options = parser.get("options").getAsString();
            //close reader
            reader.close();
            percent_change();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void percent_change() {
        
        double change_since_opendiff = mkt_price_open - mkt_price;
        double change_since_opendiv = change_since_opendiff/mkt_price;
        percent_change_since_open = change_since_opendiv*100;
        
        double change_from_day_lowdiff = mkt_price - mkt_day_low;
        double change_from_day_lowdiv = change_from_day_lowdiff/mkt_price;
        percent_change_from_day_low = change_from_day_lowdiv*100; 
        
        double change_from_day_highdiff = mkt_price - mkt_day_high;
        double change_from_day_highdiv = change_from_day_highdiff/mkt_price;
        percent_change_from_day_high = change_from_day_highdiv*100;
        writeArffFile();
    }

    public void writeArffFile() {
        //Write ARFF file
        File f = new File(file_path + stock_data);
        if(f.exists() && !f.isDirectory()) {
            try (FileWriter file = new FileWriter(file_path + stock_data, true)) {
                String stock_data_app = "\n" +
                                percent_change_since_open + "," + percent_change_from_day_low + "," + percent_change_from_day_high + "," + mkt_options ;
                                file.write(stock_data_app);
                                file.flush();
                                
                                aisaDecision();

            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try (FileWriter file = new FileWriter(file_path + stock_data)) {
                String stock_data = "@relation stock" + "\n" + "\n" + 
                                "@attribute percent_change_since_open real" + "\n" +
                                "@attribute percent_change_from_day_low real" + "\n" +
                                "@attribute percent_change_from_day_high real" + "\n" +
                                "@attribute action {buy, sell, hold}" + "\n" +
                                "\n" +
                                "@data" + "\n" +
                                percent_change_since_open + "," + percent_change_from_day_low + "," + percent_change_from_day_high + "," + mkt_options ;
                                file.write(stock_data);
                                file.flush();
                                
                                aisaDecision();

            } catch (IOException e) {
                e.printStackTrace();
            }
        } 
    }

    public void aisaDecision(){
        try{
            readArffFile();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    
    public void readArffFile() throws Exception {
        
        // train using stock_data.arff:
        setStock_training(stock_data);

        Instances training_data = new Instances(new BufferedReader(new FileReader(file_path + stock_training)));
		training_data.setClassIndex(training_data.numAttributes() - 1);
        
        Instances testing_data = new Instances(new BufferedReader(new FileReader(file_path + stock_data)));
		testing_data.setClassIndex(training_data.numAttributes() - 1);

		String summary = training_data.toSummaryString();
		int number_samples = training_data.numInstances();
		int number_attributes_per_sample = training_data.numAttributes();
        String noaim = "Number of attributes in model = " + number_attributes_per_sample;
        String noas = "Number of samples = " + number_samples;
        String smy = "Summary: " + summary;
        //System.out.println();
        
        // a classifier for decision trees:
        J48 j48 = new J48();
        
        // filter for removing samples:
        Remove rm = new Remove();
        rm.setAttributeIndices("1");  // remove 1st attribute

        // filtered classifier
        FilteredClassifier fc = new FilteredClassifier();
        fc.setFilter(rm);
        fc.setClassifier(j48);
        // train using stock_training_data.arff:
        fc.buildClassifier(training_data);
        // test using stock_testing_data.arff:
        for (int i = 0; i < testing_data.numInstances(); i++) {
            double pred = fc.classifyInstance(testing_data.instance(i));
            setGiven_value(testing_data.classAttribute().value((int)testing_data.instance(i).classValue()));
            if(testing_data.classAttribute().value((int)testing_data.instance(i).classValue()) == testing_data.classAttribute().value((int) pred)){
                setPredicted_value("Aisa: Great! to " + testing_data.classAttribute().value((int) pred) + ".");
            } else {
                setPredicted_value("Aisa: I'd suggest you " + testing_data.classAttribute().value((int) pred) + ".");
            }
        }
	}

    //Costructor
    public AisaMain(String mkt_data_json){
        setJson(mkt_data_json);
    }    
}
