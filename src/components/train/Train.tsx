import React, { FC } from "react";
import { ITrain } from "../../types";
import styles from "../train/Train.module.css"

interface TrainPropsType {
  trains: ITrain[];
}

export const Train: FC<TrainPropsType> = React.memo(({ trains }) => {
  return (
    <div style={{ overflowX: "auto"}}>
      <table className={styles.tb}>
        <thead>
          <tr className={styles.trh}>
            <th>Id</th>
            <th>Train Number</th>
            <th>Passenger Count</th>
            <th>Country(from)</th>
            <th>Country(to)</th>
            <th>Start Time</th>
            <th>Ticket Price</th>
          </tr>
        </thead>
        {trains.map((elm) => {
          return (
            <tbody key={elm.id}>
              <tr>
                <td>{elm.id}</td>
                <td>{elm.train_number}</td>
                <td>{elm.passengers_count}</td>
                <td>{elm.from_country}</td>
                <td>{elm.to_country}</td>
                <td>{elm.start_time}</td>
                <td>{elm.ticket_price}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
});