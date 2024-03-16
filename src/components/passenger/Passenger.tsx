import React, { FC } from "react";
import { IPassenger } from "../../types";
import styles from "./Passenger.module.css";

interface PassengerPropsType {
  passengers: IPassenger[];
}

export const Passenger: FC<PassengerPropsType> = React.memo(
  ({ passengers }) => {
    return (
      <div style={{ overflowX: "auto" }}>
        <table className={styles.tb}>
          <thead>
            <tr className={styles.trh}>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Phone</th>
              <th className={styles.th}>Train Id(from)</th>
            </tr>
          </thead>
          {passengers.map((elm) => {
            return (
              <tbody key={elm.id}>
                <tr>
                  <td>{elm.id}</td>
                  <td>{elm.name}</td>
                  <td>{elm.phone}</td>
                  <td>{elm.trainId}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
);
