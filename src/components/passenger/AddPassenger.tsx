import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { IPassenger, ITrain } from "../../types";
import styles from "./Passenger.module.css";

interface AddPassengerPropsType {
  addPassenger: Function;
  trains: ITrain[];
  passengers: IPassenger[];
}

export const AddPassenger: FC<AddPassengerPropsType> = React.memo(({
  addPassenger,
  trains,
  passengers,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPassenger>();
  const save = (data: IPassenger) => {
    data.id = Date.now();
    addPassenger(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(save)} className={styles.form}>
        <input
          type="text"
          placeholder="Enter the passenger name"
          {...register("name", { required: "Fill fields" })}
        />
        {errors.name && <p className={styles.error}> {errors.name.message}</p>}
        <input
          type="text"
          placeholder="Enter the passengers phone number"
          {...register("phone", {
            required: "Fill fields",
            pattern: {
              value: /^\d{6}$/,
              message: "Enter a valid 6-digit numeric value",
            },
          })}
        />
        {errors.phone && (
          <p className={styles.error}> {errors.phone.message}</p>
        )}

        <select
          {...register("trainId", {
            required: "Fill fields",
            validate: (val) => {
              const passenger: IPassenger[] = passengers.filter(
                (elm) => elm.trainId === val
              );
              const train = trains.find((elm) => elm.id === val) as ITrain;

              console.log(passenger);
              console.log(train);

              if (passenger.length >= train.passengers_count) {
                return "No space in the train";
              }
              return true;
            },
          })}
        >
          <option value="" hidden>
            Select Train
          </option>
          {trains.map((elm) => {
            return (
              <option value={elm.id} key={elm.id}>
                No. {elm.train_number}: {elm.from_country} - {elm.to_country} |
                Price: {elm.ticket_price}
              </option>
            );
          })}
        </select>
        {errors.trainId && (
          <p className={styles.error}> {errors.trainId.message}</p>
        )}
        <button>Add Passenger</button>
      </form>
    </div>
  );
})