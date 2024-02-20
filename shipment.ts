/**
 * Represents a Shipment
 */
class Shipment {
    address: string;

    /**
     * Creates a new Shipment instance.
     */
    constructor(address: string) {
        this.address = address;
    }

    /**
     * Gets the length of the address street name
     * 
     * Extracts the street name by using a regular expression that expects:
     *  - the string to have an option leading number with a space
     *  - then the street name followed by a comma
     */
    getStreetLength(): number {
        const streetNameMatch = this.address.match(/^\d*\s*([^,]+)/);
        const streetName = streetNameMatch ? streetNameMatch[1].trim() : '';
        return streetName.length;
    }
}

export default Shipment;
