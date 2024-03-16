import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { ITrain } from "../../types";
import styles from "./Train.module.css"

interface AddTrainPropsType {
  addTrain: Function;
  trains: ITrain[];
  cities: string[];
}

export const AddTrain: FC<AddTrainPropsType> = React.memo(
  ({ addTrain, trains, cities }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      reset,
    } = useForm<ITrain>();
    const save = (data: ITrain) => {
      data.id = Date.now();
      addTrain(data);
      reset();
    };
    return (
      <div>
        <form onSubmit={handleSubmit(save)} className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="Enter train number"
              {...register("train_number", {
                required: "Fill the field",
                pattern: {
                  value: /^\d{2}$/,
                  message: "Enter a valid 2-digit numeric value",
                },
                validate: (val) => {
                  const train = trains.find((elm) => elm.train_number === val);
                  if (train) {
                    return "Train Number already exists";
                  }
                  return true;
                },
              })}
            />
            {errors.train_number && (
              <p className={styles.error}> {errors.train_number.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter the passengers count"
              {...register("passengers_count", {
                required: "Fill the field",
                pattern: {
                  value: /^\d+$/,
                  message: "Enter a numeric value",
                },
              })}
            />
            {errors.passengers_count && (
              <p className={styles.error}>
                {" "}
                {errors.passengers_count.message}.
              </p>
            )}
          </div>
          <div>
            <select
              {...register("from_country", {
                required: "Fill the field",
                validate: (val) => {
                  const values = getValues();

                  if (values.to_country === val) {
                    return "Select different countries";
                  }
                  return true;
                },
              })}
            >
              <option value="" hidden>
                Select From Country
              </option>

              {cities.map((elm, i) => (
                <option key={i}>{elm}</option>
              ))}
            </select>
            {errors.from_country && (
              <p className={styles.error}> {errors.from_country.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("to_country", {
                required: "Fill the field",
                validate: (val) => {
                  const values = getValues();
                  if (values.from_country === val) {
                    return "Select different countries";
                  }
                  return true;
                },
              })}
            >
              <option value="" hidden>
                Select To Country
              </option>
              {cities.map((elm, i) => (
                <option key={i}>{elm}</option>
              ))}
            </select>
            {errors.to_country && (
              <p className={styles.error}> {errors.to_country.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter the start time"
              {...register("start_time", {
                required: "Fill the field",
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Enter a numeric value",
                },
              })}
            />
            {errors.start_time && (
              <p className={styles.error}> {errors.start_time.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter the ticket price"
              {...register("ticket_price", {
                required: "Fill the field",
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Enter a numeric value",
                },
              })}
            />
            {errors.ticket_price && (
              <p className={styles.error}> {errors.ticket_price.message}</p>
            )}
          </div>
          <button>Add Train</button>
        </form>
      </div>
    );
  }
);
