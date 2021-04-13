export default class Asset {
  constructor(name, slabData, biome, frequency) {

    this.id = genUUIDv4();
    this.name = name;
    this.slabData = slabData;
    this.biome = biome;
    this.frequency = frequency;

    this.tempFunc();

  }

  get getID() {
    return this.id;
  }
  get getName() {
    return this.name;
  }
  get getSlabData() {
    return this.slabData;
  }
  get getBiome() {
    return this.biome;
  }
  get getFrequency() {
    return this.frequency;
  }

  tempFunc = () => {

  }

}