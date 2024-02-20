/**
 * Represents a Driver
 */
class Driver {
    name: string;

    /**
    * Creates a new Driver instance
    */
    constructor(name: string) {
        this.name = name;
    } 

    /**
     * Gets the length of the Driver's name
     */
    getLength(): number {
        return this.name.length;
    }

    /**
     * Gets the count of vowel characters in the Driver's name
     */
    getVowelsCount(): number {
        return (this.name.match(/[aeiouAEIOU]/g) || []).length; 
    }

    /**
     * Gets the count of consonant characters in the Driver's name
     */
    getConsonantsCount(): number {
        return this.getLength() - this.getVowelsCount();
    }
}

export default Driver;