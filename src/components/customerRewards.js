import React from "react";
import { transactionsData } from "../data/transactions";
export const CustomerRewards = () => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const getRewardPointsFromAmount = amount => {
    let point = 0;
    if (amount > 50) {
      point = amount - 50;
    }
    if (amount > 100) {
      point = point + amount - 100;
    }
    return point;
  };

  let monthlyCustomerPointTrans = {};
  let totalCustomerPointTrans = {};

  const getRewardsPointPerMonth = () => {
    transactionsData.transactions.forEach(el => {
      let d = new Date(el.datetime);
      let month = months[d.getMonth()];
      if (!monthlyCustomerPointTrans[month]) {
        monthlyCustomerPointTrans[month] = {};
      }
      if (!monthlyCustomerPointTrans[month][el.customerName]) {
        monthlyCustomerPointTrans[month][el.customerName] = 0;
      }

      if (!totalCustomerPointTrans[el.customerName]) {
        totalCustomerPointTrans[el.customerName] = 0;
      }

      monthlyCustomerPointTrans[month][el.customerName] =
        monthlyCustomerPointTrans[month][el.customerName] +
        getRewardPointsFromAmount(el.amount);

      totalCustomerPointTrans[el.customerName] =
        totalCustomerPointTrans[el.customerName] +
        getRewardPointsFromAmount(el.amount);
    });
  };

  getRewardsPointPerMonth();
  console.log("print monthlyCustomerPointTrans", monthlyCustomerPointTrans);

  return (
    <>
      <h1>Monthly Customer Rewards</h1>
      <div>
        {Object.keys(monthlyCustomerPointTrans).map(month => {
          return (
            <>
              <div className="box">
                <h3> Month: {month} </h3>
                {Object.keys(monthlyCustomerPointTrans[month]).map(
                  customerName => (
                    <div>
                      <div className="label">{customerName}</div>
                      <div className="value">
                        {monthlyCustomerPointTrans[month][customerName]}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          );
        })}
      </div>

      <h1>Total Customer Rewards</h1>
      {Object.keys(totalCustomerPointTrans).map(customerName => (
        <div>
          <div className="label">{customerName}</div>
          <div className="value">{totalCustomerPointTrans[customerName]}</div>
        </div>
      ))}
    </>
  );
};
