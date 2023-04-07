enum GenderEnum {
    male = "male",
    female = "female"
  };
  
  export type Puppy = {
    _id: String;
    city: String;
    state: String;
    age: String;
    dog_name: String;
    tagline: String;
    intro: String;
    gender: GenderEnum;
  };