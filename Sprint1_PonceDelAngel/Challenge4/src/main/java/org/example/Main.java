/**
 * Main.java
 *
 * Project: Challenge4
 * Version: 1.1.0
 * Author: Dana Elizabeth Ponce Del Angel
 * Date: 2025-10-07
 *
 * Description:
 * This program allows the user to enter restaurant information from the console
 * and store it in the 'Restaurantes' collection of the 'Challenge4' MongoDB database.
 * Each document will automatically get an _id assigned by MongoDB.
 * Multiple restaurants can be added without removing existing records.
 *
 * Versioning:
 * 1 (Major Version): First functional version of the program with MongoDB connection.
 * 1 (New Features): Added dynamic restaurant entry through the console.
 * 0 (Revisions): No minor fixes yet.
 */

package org.example;

import com.mongodb.client.*;
import org.bson.Document;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {

    /**
     * Main method.
     *
     * Connects to MongoDB, allows the user to enter multiple restaurants via the console,
     * stores the documents in the database, and displays all current records.
     *
     * @param args Command-line arguments (not used).
     */
    public static void main(String[] args) {
        // MongoDB connection URI
        String uri = "mongodb://localhost:27017";

        // Scanner to read user input
        Scanner sc = new Scanner(System.in);

        // Control variable for the input loop
        int n = 1;

        try (MongoClient client = MongoClients.create(uri)) {
            // Connect to the 'Challenge4' database
            MongoDatabase database = client.getDatabase("Challenge4");

            // Get the 'Restaurantes' collection
            MongoCollection<Document> collection = database.getCollection("Restaurantes");

            // Temporary list to store documents before inserting them
            List<Document> restaurantes = new ArrayList<>();

            // Input loop for restaurants
            while(n == 1) {
                System.out.println("\nEnter details for a new restaurant:");

                // Read basic restaurant information
                System.out.print("Name: ");
                String name = sc.nextLine();

                System.out.print("Rating (e.g., 4.5): ");
                double rating = Double.parseDouble(sc.nextLine());

                System.out.print("Review: ");
                String review = sc.nextLine();

                System.out.print("Date (yyyy-mm-dd): ");
                String date = sc.nextLine();

                System.out.print("Building number: ");
                String building = sc.nextLine();

                System.out.print("Street: ");
                String street = sc.nextLine();

                System.out.print("Zip code: ");
                String zipcode = sc.nextLine();

                // Create MongoDB document without _id (MongoDB assigns it automatically)
                Document restaurant = new Document("name", name)
                        .append("rating", rating)
                        .append("review", review)
                        .append("date", date)
                        .append("address", new Document("building", building)
                                .append("street", street)
                                .append("zipcode", zipcode));

                // Add document to the temporary list
                restaurantes.add(restaurant);

                // Ask user if they want to add another restaurant
                System.out.println("Do you want to add another restaurant?");
                System.out.println("1 - Yes");
                System.out.println("2 - No");
                n = Integer.parseInt(sc.nextLine());
            }

            // Insert all restaurants into the MongoDB collection
            collection.insertMany(restaurantes);

            // Success message
            System.out.println("New records added successfully.");

            // Display all current documents in the collection
            System.out.println("\nContents of the 'Restaurantes' collection:");
            for (Document doc : collection.find()) {
                System.out.println(doc.toJson());
            }

        } catch (Exception e) {
            // Catch general connection or insertion errors
            System.err.println("Error: " + e.getMessage());
        }

        // Close the scanner
        sc.close();
    }
}
