import { useForm } from "react-hook-form";
import { useState } from "react";
import { ITrain, IPassenger } from "./types";
import { Train } from "./components/train/Train"
import { Passenger } from "./components/passenger/Passenger";
import { AddTrain } from "./components/train/AddTrain";
import { AddPassenger } from "./components/passenger/AddPassenger";

function App() {
  const [trains, setTrains] = useState<ITrain[]>([
    {
      id: 1,
      train_number: 10,
      passengers_count: 2,
      from_country: "Armenia",
      to_country: "Georgia",
      start_time: 10.35,
      ticket_price: 10.0,
    },
    {
      id: 2,
      train_number: 15,
      passengers_count: 100,
      from_country: "Poland",
      to_country: "France",
      start_time: 11.35,
      ticket_price: 20.0,
    },

    {
      id: 3,
      train_number: 20,
      passengers_count: 120,
      from_country: "France",
      to_country: "Italy",
      start_time: 12.35,
      ticket_price: 18.0,
    },
    {
      id: 4,
      train_number: 17,
      passengers_count: 75,
      from_country: "Armenia",
      to_country: "Spain",
      start_time: 13.35,
      ticket_price: 18.0,
    },
    {
      id: 5,
      train_number: 19,
      passengers_count: 175,
      from_country: "Spain",
      to_country: "Holand",
      start_time: 14.35,
      ticket_price: 18.0,
    },
    {
      id: 6,
      train_number: 15,
      passengers_count: 10,
      from_country: "Poland",
      to_country: "France",
      start_time: 15.35,
      ticket_price: 30.0,
    },
  ]);

  const [passengers, setPassengers] = useState<IPassenger[]>([
    {
      id: 1,
      name: "John",
      phone: 343422,
      trainId: 1,
    },
    {
      id: 2,
      name: "Bob",
      phone: 737291,
      trainId: 1,
    },
    {
      id: 3,
      name: "Kate",
      phone: 358282,
      trainId: 3,
    },
    {
      id: 4,
      name: "Jane",
      phone: 962648,
      trainId: 2,
    },
    {
      id: 5,
      name: "George",
      phone: 754369,
      trainId: 6,
    },
  ]);

  const [cities, setCities] = useState<string[]>([
    "Armenia",
    "Georgia",
    "Poland",
    "France",
    "Italy",
    "Spain",
    "Holand",
  ]);

  const [newTrain, setnNewTrain] = useState<ITrain[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addTrain = (train: ITrain) => {
    setTrains((prevTrains) => [
      ...prevTrains,
      {
        ...train,
      },
    ]);
  };

  const addPassenger = (passenger: IPassenger) => {
    setPassengers((prevPassengers) => [
      ...prevPassengers,
      {
        ...passenger,
      },
    ]);
  };

  const search = (data: any) => {
    console.log(data);
    const train = trains.filter(
      (elm) => elm.from_country === data.first && elm.to_country === data.second
    );
    console.log(train);
    setnNewTrain(train);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(search)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <select
          {...register("first")}
          style={{
            padding: "10px",
            margin: "5px 0",
          }}
        >
          <option value="" hidden>
            Select From Country
          </option>
          {cities.map((elm, i) => (
            <option key={i}>{elm}</option>
          ))}
        </select>
        <select
          {...register("second")}
          style={{
            padding: "10px",
            margin: "5px 0",
          }}
        >
          <option value="" hidden>
            Select To Country
          </option>
          {cities.map((elm, i) => (
            <option key={i}>{elm}</option>
          ))}
        </select>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
      <div>
        <Train trains={newTrain.length > 0 ? newTrain : trains} />
        <AddTrain addTrain={addTrain} trains={trains} cities={cities} />
      </div>
      <div>
        <Passenger passengers={passengers} />
        <AddPassenger
          addPassenger={addPassenger}
          trains={trains}
          passengers={passengers}
        />
      </div>
    </>
  );
}

export default App;
