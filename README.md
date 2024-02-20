HOW TO RUN:
 - Open a terminal prompt to this directory and install dependencies by running:
     npm install

 - Now complie the '.ts' files by runnning the following command:
     tsc shipment.ts driver.ts main.ts

 - Finally, run the main.js file and pass it the file locations of your input files.  Two have been provided in the txt directory:
     node main.js ./txt/shipments.txt ./txt/drivers.txt

If you edit the txt files provided, make sure you save the files using the LF End of Line Sequence.  Otherwise EOL characters may need to be parsed out when the files are read.


My approach to solving this problem:

 - I started by understanding the problem statement, which involves carefully reading the suitability score algorithm.

 - The command line interface is simple and reads the contents of each file before it proceeds with the algorithm.

 - I wanted to represent the Shipments and Drivers as classes to keep the logic for each separated and unique to that class.

 - I implemented a method in the ShipmentAssigner class to iterate through shipments and drivers, calculating suitability scores, and making assignments while maximizing the total suitability score.

 - Within the ShipmentAssigner class I translated the suitability score algorithm from the problem into a method that can assign a score.  This includes a method for finding common factors between two numbers.


My assumptions:

 - The driver names provided in the input file are assumed to be well-formatted.

 - The shipment addresses are assumed to have house numbers followed by a street name.

 - The vowel count includes duplicates.

 - Input text files are saved with the LF End of Line Sequence.
