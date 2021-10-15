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
    <div>
      <h3 className='header'>Monthly Customer Rewards</h3>
      <div className='container'>
        {Object.keys(monthlyCustomerPointTrans).map(month => {
          return (
            <>
              <div className="box">
                <h3 style={{ padding: '5px' }}> Month: {month} </h3>
                <hr />
                <div>
                  <table>
                    <tr>
                      <th>Customer Name</th>
                      <th>Rewards</th>
                    </tr>
                    {Object.keys(monthlyCustomerPointTrans[month]).map(
                      customerName => (
                        <tr>
                          <td>{customerName}</td>
                          <td>{monthlyCustomerPointTrans[month][customerName]}</td>
                        </tr>
                      )
                    )}
                  </table>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <h3 className='header'>Total Customer Rewards</h3>
      <table style={{margin:'auto', border:'1px solid grey'}}>
        <tr>
          <th style={{width: '15vw'}}>Customer Name</th>
          <th style={{width: '15vw'}}>Total Rewards</th>
        </tr>
        {Object.keys(totalCustomerPointTrans).map(customerName => (
          <tr>
            <td style={{width: '15vw'}}>{customerName}</td>
            <td style={{width: '15vw'}}>{totalCustomerPointTrans[customerName]}</td>
          </tr>

        ))}
      </table>
    </div>
  );
};
