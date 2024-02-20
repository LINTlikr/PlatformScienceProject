import * as fs from 'fs';
import Shipment from './shipment';
import Driver from './driver';

/**
 * Shipment Assigner class that handles the assignment of shipments to drivers
 */
class ShipmentAssigner {

    /**
    * Shipment instances
    */
    shipments: Shipment[];

    /**
    * Driver instances
    */
    drivers: Driver[];

    /**
    * Creates a new ShipmentAssigner instance
    */
    constructor(shipments: string[], drivers: string[]) {
        this.shipments = shipments.map((address) => new Shipment(address));
        this.drivers = drivers.map((name) => new Driver(name));
    }

    /**
    * Calculates the suitability score for a given shipment and driver
    */
    calculateSuitability(shipment: Shipment, driver: Driver): number {
        const baseSS =
        shipment.getStreetLength() % 2 === 0
            ? driver.getVowelsCount() * 1.5
            : driver.getConsonantsCount() * 1;

        const commonFactors = this.findCommonFactors(
            shipment.getStreetLength(),
            driver.getLength()
        );

        const finalSS = commonFactors.length > 0 ? baseSS * 1.5 : baseSS;

        return finalSS;
    }

    /**
    * Finds the common factors between two numbers
    * Assumes factors are greater than 1
    */
    findCommonFactors(a: number, b: number): number[] {
        const factors : number[] = [];
        for (let i = 2; i <= Math.min(a, b); i++) {
            if (a % i === 0 && b % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }

    /**
    * Assigns shipments to drivers based on suitability scores
    */
    assignShipments(): { totalSS: number; assignments: [string, string][] } {
        let totalSS = 0;
        const assignments: [string, string][] = [];

        // For each shipment, tracks a drive with the highest suitability score
        for (const shipment of this.shipments) {
            let maxSS = 0;
            let assignedDriver: Driver | null = null;

            // Calculates suitability for each driver
            for (const driver of this.drivers) {
                const suitability = this.calculateSuitability(shipment, driver);

                // Once a new maximum score is found, assigns that driver to the current shipment
                if (suitability > maxSS) {
                    maxSS = suitability;
                    assignedDriver = driver;
                }
            }

            // Once a driver is assigned to a shipment, the pair are saved and the assigned driver is removed from being assignable 
            if (assignedDriver) {
                totalSS += maxSS;
                assignments.push([shipment.address, assignedDriver.name]);
                this.drivers = this.drivers.filter(
                    (driver) => driver !== assignedDriver
                );
            }
        }

        return { totalSS, assignments };
    }
}

// Command line interface that reads the run command arguments
const shipmentsFilePath = process.argv[2];
const driversFilePath = process.argv[3];

// Reads file data
const shipmentsInput = fs.readFileSync(shipmentsFilePath, 'utf-8').split('\n').filter(Boolean);
const driversInput = fs.readFileSync(driversFilePath, 'utf-8').split('\n').filter(Boolean);

// Runs the main program
const assigner = new ShipmentAssigner(shipmentsInput, driversInput);
const result = assigner.assignShipments();

// Displays the output to the command line
console.log('Total Suitability Score:', result.totalSS);
console.log('Assignments:', result.assignments);
